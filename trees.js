const MAX = 12;
const MAX_INT = 2147483647;
let btn;
let output;
let maxdepth;
let mindepth;
let textarea;
let lownum;
let highnum;
let chance;

const init = () => {
    btn = document.querySelector("#btn");
    maxdepth = document.querySelector("#maxDepth");
    mindepth = document.querySelector("#minDepth");
    textarea = document.querySelector("#outputBox");
    lownum = document.querySelector("#lownum");
    highnum = document.querySelector("#highnum");
    chance = document.querySelector("#chance");
    
    btn.addEventListener("click", clicked);
}

const clicked = () => {
    let depth = maxdepth.value;
    let lowDepth = mindepth.value;
    let low = lownum.value;
    let high = highnum.value;
    let childChance = chance.value;
    if (isNaN(depth) || isNaN(childChance) || isNaN(lowDepth) || high > MAX_INT || low < (MAX_INT*-1) || high<low) return;
    low = parseInt(low);
    high = parseInt(high);
    depth = parseInt(depth);
    lowDepth = parseInt(lowDepth);
    lowDepth = depth-lowDepth;
    childChance = parseInt(childChance);

    let breadth = 1;
    let next;
    let res = [];
    while (depth > 0 && breadth > 0) {
        next = 0;
        let guaranteeGen = false;
        while (breadth > 0) {
            // Has not reached min depth, do check
            if (depth > lowDepth && (breadth == 1 && !guaranteeGen)) {
                res.push(Math.floor(Math.random() * (high - low + 1)) + low);
                next+=2;
            } else {
                let num = Math.floor(Math.random()*100);
                console.log(num);
                if (num > childChance) {
                    console.log("null");
                    res.push("null");
                }
                else {
                    guaranteeGen = true;
                    res.push(Math.floor(Math.random() * (high - low + 1)) + low);
                    next+=2;
                }
            }
            breadth--;
        }
        breadth = next;
        depth--;
    }
    textarea.value = "[" + res + ']';
}