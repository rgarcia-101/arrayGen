let btn;
let output;
let maxdepth;
let textarea;

const init = () => {
    btn = document.querySelector("#btn");
    maxdepth = document.querySelector("#maxDepth");
    textarea = document.querySelector("#outputBox");
    
    btn.addEventListener("click", clicked);
}

const clicked = () => {
    let depth = maxdepth.value;
    if (isNaN(depth) || depth > 16) return;
    let breadth = 1;
    let next;
    let res = [];
    while (depth > 0 && breadth > 0) {
        next = 0;
        while (breadth > 0) {
            let num = Math.floor(Math.random()*100)-0;
            if (num < 0) res.push("null");
            else {
                res.push(num);
                next+=2;
            }
            breadth--;
        }
        breadth = next;
        depth--;
    }
    textarea.value = "[" + res + ']';
}