let textarea;
let length;
let multi;
let err;
let btn;
let process;

const init = () => {
    btn = document.querySelector("#generatebtn");
    textarea = document.querySelector("#outputBox");
    process = document.querySelector("#processtext");
    btn.addEventListener("click", clicked);
    err = document.querySelector("#errortext");
}


const clicked = () => {
    btn.disabled = true;
    err.innerHTML = "";
    process.innerHTML = "Generating..."
    const promise = generateArray()
    .then(response => {
        process.innerHTML = "";
    }).catch(error => {
        process.innerHTML = "";
        let msg;
        console.log(error.message);
        if (error.message === "impropernum") {
            msg = "Could not generate! Are inputs non-negative and below the maximum?"
        } else if (error.message === "nan") {
            msg = "Could not generate! Are inputs numerical?";
        } else msg = "Could not generate! Something went wrong."
        err.innerHTML = msg;
    });
    btn.disabled = false;
}

const generateArray = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            length = document.querySelector("#length");
            multi = document.querySelector("#maxnum");
            let neg = document.querySelector("#negatives").checked;
            // TODO handle larger numbers
            if ((isNaN(length.value) || isNaN(multi.value)) || (length.value === "" || multi.value === "")) {
                reject(Error("nan"));
            } else {
                length = parseInt(length.value);
                multi = parseInt(multi.value);
                if (((length > 2000000 || multi > 2147483647)) || (length < 0 || multi < 0)) {
                    reject(Error("impropernum"));
                } else {
                    textarea.innerHTML = "";
                    let temp = [];
                    let addNeg = 0;
                    if (neg) addNeg = 0.5
                    for (let i = 0; i < length; i++) {
                        temp.push(Math.floor((Math.random() - addNeg) * multi));
                    }
                    textarea.innerHTML = "[" + temp.toString() + "]";
                }
                resolve("done");
            }
        }, 100);
    });
}
