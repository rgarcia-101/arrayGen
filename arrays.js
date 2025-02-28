const MAX = 2000000;
const MAX_INT = 2147483647;
let textarea;
let lownum;
let highnum;
let err;
let btn;
let process;
let lengthbox;
let randtype;
let asctype;
let desctype;
let type = 0;



/**
 * Runs on page load, loads document objects into vars
 */
const init = () => {
    btn = document.querySelector("#generatebtn");
    textarea = document.querySelector("#outputBox");
    process = document.querySelector("#processtext");
    err = document.querySelector("#errortext");
    lengthbox = document.querySelector("#length");
    lownum = document.querySelector("#lownum");
    highnum = document.querySelector("#highnum");

    // TODO put type selectors into array for better flexibility
    randtype = document.querySelector("#rand");
    asctype = document.querySelector("#asc");
    desctype = document.querySelector("#desc");

    lengthbox.placeholder = "Max " + MAX;
    lownum.placeholder = "Max " + MAX_INT;
    highnum.placeholder = "Max " + MAX_INT;

    
    btn.addEventListener("click", clicked);
    lengthbox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") clicked();
    });
    lownum.addEventListener("keypress", function(event) {
        if (event.key === "Enter") clicked();
    });
    highnum.addEventListener("keypress", function(event) {
        if (event.key === "Enter") clicked();
    });
}

/**
 * Handles generate btn click, attempts to generate array
 */
const clicked = () => {
    btn.disabled = true;
    err.innerHTML = "";
    process.innerHTML = "Generating..."
    generateArray()
    .then(response => {
        textarea.value = response;
        process.innerHTML = "";
        btn.disabled = false;
    }).catch(error => {
        process.innerHTML = "";
        let msg;
        if (error.message === "impropernum") {
            msg = "Could not generate! Are inputs in the valid range?"
        } else if (error.message === "nan") {
            msg = "Could not generate! Are inputs numerical?";
        } else msg = "Could not generate! Something went wrong."
        err.innerHTML = msg;
        btn.disabled = false;
    });
    
}

/**
 * Generates an array of random numbers
 * @returns resolved or rejected promise
 */
const generateArray = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let output;
            let low = lownum.value;
            let high = highnum.value;
            let length = lengthbox.value;
            let type = changeType();
            // TODO handle larger numbers
            if ((isNaN(low) || isNaN(high) || isNaN(length)) || (low === "" || high === "" || length === "")) {
                reject(Error("nan"));
            } else {
                // TODO organize, break into functions
                low = parseInt(low);
                high = parseInt(high);
                length = parseInt(length);
                if (((Math.abs(high-low) > MAX || length > MAX)) || (low > high || length < 0)) {
                    reject(Error("impropernum"));
                } else {
                    let temp = [];
                    if (type == 1) {
                        for (let i = low; i <= high; i++) {
                            temp.push(i);
                        }
                    }
                    else if (type == 2) {
                        for (let i = high; i >= low; i--) {
                            temp.push(i);
                        }
                    }
                    else {
                        for (let i = 0; i < length; i++) {
                            temp.push(Math.floor(Math.random() * (high - low + 1)) + low);
                        }
                    }
                    output = "[" + temp.toString() + "]";
                }
                resolve(output);
            }
        }, 200);
    });
}


/**
 * Determine the type of array to generate
 */
const changeType = () => {
    if (randtype.checked) return 0;
    else if (asctype.checked) return 1;
    else if (desctype.checked) return 2;
    else return 0;
}
