const MAX = 2000000;
const MAX_INT = 2147483647;
let textarea;
let err;
let btn;
let process;
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

    asctype = document.querySelector("#asc");
    desctype = document.querySelector("#desc");



    btn.addEventListener("click", clicked);
}


const clicked = async () => {
    btn.disabled = true;
    err.innerHTML = "";
    process.innerHTML = "Processing...";

    let result = await generate();
    if (result === "0") {
    } else {
        // TODO decide what to do here
    }
    btn.disabled = false;
}

const generate = async () => {
    try {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                let input = textarea.value;
                if (input.length > 100000) {
                    reject(Error("3"));
                    return;
                }
                // TODO do this better
                input = input.replaceAll("[", "");
                input = input.replaceAll("]", "");

                let inputArr = input.split(",");
                let arr = [];
                inputArr.forEach(i => {
                    let num = Number(i.trim());
                    if (isNaN(num)) {
                        reject(Error("2"));
                        return;
                    } else arr.push(num);
                });
                if (desctype.checked) {
                    arr.sort((a, b) => b - a);
                } else {
                    arr.sort((a, b) => a - b);
                }
                
                process.innerHTML = "";
                textarea.value = "[" + arr.toString() + "]";

                resolve("0");
            }, 200);
        });
    } catch (error) {
        process.innerHTML = "";
        err.innerHTML = "Could not sort!";
        console.log(error.message);
    }
}