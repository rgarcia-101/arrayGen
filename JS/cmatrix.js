const MAX = 2000000;
let textarea;
let err;
let btn;
let inputtext;
let process;
let lengthbox;
let ilengthbox;
let addQuotes;
let arrType;
let wordType;



/**
 * Runs on page load, loads document objects into vars
 */
const init = () => {
    btn = document.querySelector("#generatebtn");
    textarea = document.querySelector("#outputBox");
    inputtext = document.querySelector("#inBox");
    process = document.querySelector("#processtext");
    err = document.querySelector("#errortext");
    lengthbox = document.querySelector("#length");
    ilengthbox = document.querySelector("#ilength");
    addQuotes = document.querySelector("#addQuotes");
    arrType = document.querySelector("#array");
    wordType = document.querySelector("#words");

    lengthbox.placeholder = "Max " + MAX;
    ilengthbox.placeholder = "Max " + MAX;


    btn.addEventListener("click", clicked);
    lengthbox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") clicked();
    });
    ilengthbox.addEventListener("keypress", function (event) {
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
            let length = lengthbox.value;
            let ilength = ilengthbox.value
            // TODO organize, split into more reasons
            if ((isNaN(length) || isNaN(ilength)) || (length === "" || ilength === "")) {
                reject(Error("1"));
                return;
            } else {
                let quotes = addQuotes.checked;
                let input = inputtext.value;
                length = parseInt(length);
                ilength = parseInt(ilength);
                if (length > MAX || ilength > MAX || input.length > MAX || length * ilength > MAX
                    || length < 0 || ilength < 0) {
                    reject(Error("2"));
                    return;
                } else {

                    // TODO optimize this?
                    let type = 0;
                    if (wordType.checked) type = 1;
                    input = input.split(",");
                    let inputSize = input.length;
                    let temp = [];
                    // TODO 

                    if (type == 0) {
                        for (let i = 0; i < length; i++) {
                            temp.push([]);
                            temp[i].push(new Array(ilength));
                        }
                        for (let i = 0; i < length; i++) {
                            for (let j = 0; j < ilength; j++) {
                                if (quotes)
                                    temp[i][j] = '"' + input[Math.floor(Math.random() * inputSize)].trim() + '"';
                                else
                                    temp[i][j] = input[Math.floor(Math.random() * inputSize)].trim();
                            }
                        }

                        for (let i = 0; i < length; i++) {
                            output += "[" + temp[i].toString() + "]";
                            if (i != length - 1) output += ",";
                        }
                    }
                    else {
                        for (let i = 0; i < length; i++) {
                            let word = quotes ? '"' : "";
                            for (let j = 0; j < ilength; j++) {
                                word += input[Math.floor(Math.random() * inputSize)].trim();
                            }
                            if (quotes) word += '"';
                            temp.push(word);
                        }
                        output = temp.toString();
                    }

                    if (type == 0) output = "[" + output + "]";
                    process.innerHTML = "";
                    // output = "[" + output + "]";
                }
                textarea.value = output;
                resolve("0");
            }
        }, 200);
    }).catch(error => {
        process.innerHTML = "";
        switch (error.message) {
            case "1":
                err.innerHTML = "Could not generate! Are inputs filled out and numerical?"
                break;
            case "2":
                err.innerHTML = "Could not generate! Are inputs in the valid range?";
                break;
            default:
                err.innerHTML = "Could not generate! Something went wrong."
                break;
        }
        btn.disabled = false;
    });

    let result = await promise;

    if (result === "0") {
        // console.log("success");
        btn.disabled = false;
    }
}
