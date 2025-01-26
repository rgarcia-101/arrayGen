let textarea;
let length;
let multi;
let err;
let btn;
let process;
let lengthbox;
let intbox;
const MAX = 2000000;
const MAX_INT = 2147483647;


/**
 * Runs on page load, loads document objects into vars
 */
const init = () => {
    btn = document.querySelector("#generatebtn");
    textarea = document.querySelector("#outputBox");
    process = document.querySelector("#processtext");
    err = document.querySelector("#errortext");
    lengthbox = document.querySelector("#length");
    intbox = document.querySelector("#maxnum");

    lengthbox.placeholder = "Max " + MAX;
    intbox.placeholder = "Max " + MAX_INT;

    
    btn.addEventListener("click", clicked);
    lengthbox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") clicked();
    });
    intbox.addEventListener("keypress", function(event) {
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
        textarea.innerHTML = response;
        process.innerHTML = "";
        btn.disabled = false;
    }).catch(error => {
        process.innerHTML = "";
        let msg;
        if (error.message === "impropernum") {
            msg = "Could not generate! Are inputs non-negative and below the maximum?"
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
            length = document.querySelector("#length");
            multi = document.querySelector("#maxnum");
            let neg = document.querySelector("#negatives").checked;

            // TODO handle larger numbers
            if ((isNaN(length.value) || isNaN(multi.value)) || (length.value === "" || multi.value === "")) {
                reject(Error("nan"));
            } else {
                length = parseInt(length.value);
                multi = parseInt(multi.value);
                if (((length > MAX || multi > MAX_INT)) || (length < 0 || multi < 0)) {
                    reject(Error("impropernum"));
                } else {
                    let low = neg ? multi*-1 : 0;
                    let temp = [];

                    for (let i = 0; i < length; i++) {
                        temp.push(Math.floor((Math.random() * (multi-low+1)) + low));
                    }
                    output = "[" + temp.toString() + "]";
                }
                if (output.length < length) reject();
                resolve(output);
            }
        }, 100);
    });
}
