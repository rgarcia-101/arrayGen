const MAX = 2000000;
const MAX_INT = 2147483647;
let textarea;
let lownum;
let highnum;
let err;
let btn;
let process;
let lengthbox;
let ilengthbox;



/**
 * Runs on page load, loads document objects into vars
 */
const init = () => {
    btn = document.querySelector("#generatebtn");
    textarea = document.querySelector("#outputBox");
    process = document.querySelector("#processtext");
    err = document.querySelector("#errortext");
    lengthbox = document.querySelector("#length");
    ilengthbox = document.querySelector("#ilength");
    lownum = document.querySelector("#lownum");
    highnum = document.querySelector("#highnum");

    lengthbox.placeholder = "Max " + MAX;
    ilengthbox.placeholder = "Max " + MAX;
    lownum.placeholder = "Max " + MAX_INT;
    highnum.placeholder = "Max " + MAX_INT;


    btn.addEventListener("click", clicked);
    lengthbox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") clicked();
    });
    lownum.addEventListener("keypress", function (event) {
        if (event.key === "Enter") clicked();
    });
    highnum.addEventListener("keypress", function (event) {
        if (event.key === "Enter") clicked();
    });
}



/**
 * 
 */
async function clicked() {
    btn.disabled = true;
    err.innerHTML = "";
    process.innerHTML = "Generating...";

    let promise = new Promise((resolve, reject) => {
        process.innerHTML = "Generating...";

        setTimeout(() => {
            let output = "";
            let low = lownum.value;
            let high = highnum.value;
            let length = lengthbox.value;
            let ilength = ilengthbox.value
            // TODO organize, split into more reasons
            if ((isNaN(low) || isNaN(high) || isNaN(length) || isNaN(ilength)) || (low === "" || high === "" || length === "" || ilength === "")) {
                reject(Error("1"));
                return;
            } else {

                low = parseInt(low);
                high = parseInt(high);
                length = parseInt(length);
                if ((Math.abs(high - low) > MAX_INT || high > MAX_INT || low < (MAX_INT * -1) || length > MAX || ilength > MAX || length * ilength > MAX) || (low > high || length < 0)) {
                    reject(Error("2"));
                    return;
                } else {

                    // TODO optimize this?
                    let temp = [];
                    for (let i = 0; i < length; i++) {
                        temp.push([]);
                        temp[i].push(new Array(ilength));
                    }
                    for (let i = 0; i < length; i++) {
                        for (let j = 0; j < ilength; j++) {
                            temp[i][j] = Math.floor(Math.random() * (high - low + 1)) + low
                            // itemp.push();
                        }
                    }

                    for (let i = 0; i < length; i++) {
                        output += "[" + temp[i].toString() + "]";
                    }
                    process.innerHTML = "";
                    output = "[" + output + "]";
                }
                textarea.value = output;
                resolve("0");
            }
        }, 200);
    }).catch(error => {
        process.innerHTML = "";
        switch (error.message) {
            case "1":
                console.log("nan/empty");
                err.innerHTML = "Could not generate! Are inputs filled out and numerical?"
                break;
            case "2":
                console.log("impropernum");
                err.innerHTML = "Could not generate! Are inputs in the valid range?";
                break;
            default:
                console.log("other");
                err.innerHTML = "Could not generate! Something went wrong."
                break;
        }
        btn.disabled = false;
    });

    let result = await promise;

    if (result === "0") {
        console.log("success");
        btn.disabled = false;
    }
}
