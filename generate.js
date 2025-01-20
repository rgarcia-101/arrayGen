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
    console.log(neg);
    if ((isNaN(length.value) || isNaN(multi.value)) || (length.value === "" || multi.value === "" )) {
        console.log("Not a number!");
        err.innerHTML = "Could Not Generate! Are inputs numerical?";
    } else {
        length = parseInt(length.value);
        multi = parseInt(multi.value);
        err.innerHTML = "";
        let output = "";
        let addNeg = 0;
        if (neg) addNeg = 0.5
        output += "[";
        for (let i = 0; i < length; i++) {
            let temp = Math.floor((Math.random()-neg)*multi);
            output += temp;
            if (i != length-1) output+= ",";
        }
        output += "]";
        textarea.innerHTML = output;
    }
    }
    