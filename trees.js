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
let graphics;

const init = () => {
    btn = document.querySelector("#btn");
    maxdepth = document.querySelector("#maxDepth");
    mindepth = document.querySelector("#minDepth");
    textarea = document.querySelector("#outputBox");
    lownum = document.querySelector("#lownum");
    highnum = document.querySelector("#highnum");
    chance = document.querySelector("#chance");
    graphics = document.querySelector("#visualizer");
    
    // TODO update this
    let temp = document.querySelector("#tempbtn");
    
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
                if (num > childChance) {
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

    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    graphics.innerHTML = "";
    if (width > 700 && res[0] != 0) {
        generateImage(0, 1, -1, 0, res);
    }
}



let generateImage = (depth, pos, lastx, lasty, res, i) => {
    let w = Math.pow(2, depth)+1;
    w = (100/w)*pos;

    let bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let outer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    bg.setAttributeNS(null, "cx", w+"%");
    bg.setAttributeNS(null, "cy", (lasty+10)+"%");
    bg.setAttributeNS(null, "r", "50");
    bg.setAttributeNS(null, "fill", "#212729");

    circ.setAttributeNS(null, "cx", w+"%");
    circ.setAttributeNS(null, "cy", (lasty+10)+"%");
    circ.setAttributeNS(null, "r", "50");
    circ.setAttributeNS(null, "stroke", "white");
    circ.setAttributeNS(null, "stroke-width", "5");
    circ.setAttributeNS(null, "fill", "none");

    outer.setAttributeNS(null, "cx", w+"%");
    outer.setAttributeNS(null, "cy", (lasty+10)+"%");
    outer.setAttributeNS(null, "r", "63");
    outer.setAttributeNS(null, "stroke", "#212729");
    outer.setAttributeNS(null, "stroke-width", "23");
    outer.setAttributeNS(null, "fill", "none");

    text.setAttributeNS(null, "x", w+"%");
    text.setAttributeNS(null, "y", (lasty+10)+"%");
    text.innerHTML = res[i];

    graphics.appendChild(bg);
    graphics.appendChild(text);
    graphics.appendChild(outer);
    graphics.appendChild(circ);

}