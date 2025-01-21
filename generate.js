let textarea;
let length;
let multi;
let err;

const init = () => {
    let btn = document.querySelector("#generatebtn");
    textarea = document.querySelector("#outputBox");
    btn.addEventListener("click", generateArray);
    err = document.querySelector("#errortext");
}

const generateArray = () => {
    length = document.querySelector("#length");
    multi = document.querySelector("#maxnum");
    let neg = document.querySelector("#negatives").checked;
    // TODO handle larger numbers
    if ((isNaN(length.value) || isNaN(multi.value)) || (length.value === "" || multi.value === "" )) {
        err.innerHTML = "Could not generate! Are inputs numerical?";
    } else {
        length = parseInt(length.value);
        multi = parseInt(multi.value);
        textarea.innerHTML = "";
        let temp = "";
        if (((length > 2000000  || multi > 2147483647 )) || (length < 0 || multi < 0)) {
            err.innerHTML = "Could not generate! Are inputs non-negative and below the maximum?";
        } else {
            err.innerHTML = "";
            let addNeg = 0;
            if (neg) addNeg = 0.5
            temp += "[";
            for (let i = 0; i < length; i++) {
                temp += Math.floor((Math.random()-addNeg)*multi);
                if (i != length-1) temp += ",";
            }
            temp += "]";
            textarea.innerHTML = temp;
        }
    }
    }
    