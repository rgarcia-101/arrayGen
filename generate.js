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
                err.innerHTML = "Could not generate! Are inputs numerical?";
                reject(Error("nonnum"));
            } else {
                length = parseInt(length.value);
                multi = parseInt(multi.value);
                if (((length > 2000000 || multi > 2147483647)) || (length < 0 || multi < 0)) {
                    err.innerHTML = "Could not generate! Are inputs non-negative and below the maximum?";
                    reject(Error("impropernum"));
                } else {
                    textarea.innerHTML = "";
                    let temp = "";
                    let addNeg = 0;
                    if (neg) addNeg = 0.5
                    temp += "[";
                    for (let i = 0; i < length; i++) {
                        temp += Math.floor((Math.random() - addNeg) * multi);
                        if (i != length - 1) temp += ",";
                    }
                    temp += "]";
                    textarea.innerHTML = temp;
                }
                resolve("done");
            }
        }, 1000);
    });
}
