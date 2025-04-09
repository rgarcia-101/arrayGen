const MAX = 12;
const MAX_INT = 2147483647;
const MAX_DEPTH = 19;
let btn;
let updateBtn;
let output;
let maxdepth;
let mindepth;
let textarea;
let lownum;
let highnum;
let chance;
let refresh;
let graphics;
let process;
let err;

const init = () => {
    btn = document.querySelector("#btn");
    updateBtn = document.querySelector("#refresh");
    maxdepth = document.querySelector("#maxDepth");
    mindepth = document.querySelector("#minDepth");
    textarea = document.querySelector("#outputBox");
    lownum = document.querySelector("#lownum");
    highnum = document.querySelector("#highnum");
    chance = document.querySelector("#chance");
    graphics = document.querySelector("#visualizer");
    process = document.querySelector("#processtext");
    err = document.querySelector("#errortext");
    refresh = document.querySelector("#refresh");

    // TODO update this
    // let temp = document.querySelector("#tempbtn");

    btn.addEventListener("click", clicked);
    updateBtn.addEventListener("click", verifyUpdate);
}


/**
 * Handles generate button clicked
 */
const clicked = async () => {
    btn.disabled = true;
    err.innerHTML = "";
    process.innerHTML = "Generating...";

    let result = await generate();
    if (result === "0") {
        btn.disabled = false;
        console.log("all good");
    } else {
        // TODO something
        console.log("Did not generate!");
    }
}


/**
 * Generates text and visual binary tree
 * @returns promise
 */
const generate = async () => {
    try {
        return await new Promise((resolve, reject) => {
            process.innerHTML = "Generating...";

            setTimeout(() => {
                let depth = maxdepth.value;
                let lowDepth = mindepth.value;
                let low = lownum.value;
                let high = highnum.value;
                let childChance = chance.value;
                if (depth === "" || childChance === "" || lowDepth === "" || high === "" || low === "") {
                    reject(Error("1"));
                    return;
                }
                else if (isNaN(depth) || isNaN(childChance) || isNaN(lowDepth) || isNaN(high) || isNaN(low)) {
                    reject(Error("2"));
                    return;
                }
                low = parseInt(low);
                high = parseInt(high);
                depth = parseInt(depth);
                lowDepth = parseInt(lowDepth);
                lowDepth = depth - lowDepth;
                childChance = parseInt(childChance);

                if (high > MAX_INT || low < (MAX_INT * -1) || high < low || depth < 1 || depth > MAX_DEPTH) {
                    reject(Error("3"));
                    return;
                }

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
                            next += 2;
                        } else {
                            let num = Math.floor(Math.random() * 100);
                            if (num > childChance) {
                                res.push("null");
                            }
                            else {
                                guaranteeGen = true;
                                res.push(Math.floor(Math.random() * (high - low + 1)) + low);
                                next += 2;
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
                if (width > 700 && res[0] != null) {
                    let lines = document.createElementNS('http://www.w3.org/2000/svg', 'g');

                    lines.setAttributeNS(null, "id", "lines");
                    graphics.appendChild(lines);
                    let head = constructTree(res);

                    if (head != null) generateImage(0, 1, -1, -10, head);
                }

                process.innerHTML = "";
                resolve("0");

            }, 200);
        });
    } catch (error) {
        // FIXME wrong errors displaying on view
        switch (error.message) {
            case "1":
                console.log("empty");
                err.innerHTML = "Could not generate! Are inputs numerical and non-blank?";
                break;
            case "2":
                console.log("nan");
                err.innerHTML = "Could not generate! Are inputs numerical and non-blank?";
                break;
            case "3":
                console.log("value overload");
                err.innerHTML = "Could not generate! Inputs are either too large or too small.";
                break;
            default:
                err.innerHTML = "Could not generate! Something went wrong.";
                console.log("how did this happen?");
                break;
        }
        process.innerHTML = "";
        btn.disabled = false;
    }
}



/**
 * Verifies the textarea input is valid before sending to generate
 */
const verifyUpdate = async () => {
    // TODO rework into promise
    graphics.innerHTML = "";
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 700) {
        let text = textarea.value;
        if (text.length < 3 || text.charCodeAt(0) != 91 || text.charCodeAt(text.length-1) != 93) return;
        text = text.substring(1, text.length-1);
        let res = text.split(",");

        let lines = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        lines.setAttributeNS(null, "id", "lines");
        graphics.appendChild(lines);
        let head = constructTree(res);

        if (head != null) generateImage(0, 1, -1, -10, head);
    }
}




/**
 * Generages an SVG binary tree
 * @param {Number} depth 
 * @param {Number} pos 
 * @param {Number} lastx 
 * @param {Number} lasty 
 * @param {Node} node 
 * @returns 
 */
const generateImage = (depth, pos, lastx, lasty, node) => {
    // TODO rework into promise?
    if (node === null || depth > 3) return;
    let w = Math.pow(2, depth) + 1;
    let h = lasty + 24;
    w = (100 / w) * pos;

    let bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let outer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    bg.setAttributeNS(null, "cx", w + "%");
    bg.setAttributeNS(null, "cy", (h) + "%");
    bg.setAttributeNS(null, "r", "50");
    bg.setAttributeNS(null, "fill", "#3f4447");

    circ.setAttributeNS(null, "cx", w + "%");
    circ.setAttributeNS(null, "cy", (h) + "%");
    circ.setAttributeNS(null, "r", "50");
    circ.setAttributeNS(null, "stroke", "white");
    circ.setAttributeNS(null, "stroke-width", "5");
    circ.setAttributeNS(null, "fill", "none");

    outer.setAttributeNS(null, "cx", w + "%");
    outer.setAttributeNS(null, "cy", (h) + "%");
    outer.setAttributeNS(null, "r", "63");
    outer.setAttributeNS(null, "stroke", "#3f4447");
    outer.setAttributeNS(null, "stroke-width", "23");
    outer.setAttributeNS(null, "fill", "none");

    text.setAttributeNS(null, "x", w + "%");
    text.setAttributeNS(null, "y", (h) + "%");
    let stringValue = node.val.toString();
    text.innerHTML = stringValue.length <= 10 ? stringValue : stringValue.substring(0,10);

    graphics.appendChild(bg);
    graphics.appendChild(text);
    graphics.appendChild(outer);
    graphics.appendChild(circ);

    if (depth != 0) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttributeNS(null, "stroke", "white");
        line.setAttributeNS(null, "stroke-width", "5");
        line.setAttributeNS(null, "x1", lastx + "%");
        line.setAttributeNS(null, "y1", (lasty) + "%")
        line.setAttributeNS(null, "x2", w + "%");
        line.setAttributeNS(null, "y2", (h) + "%");
        document.querySelector("#lines").appendChild(line);
    }

    generateImage(depth + 1, (pos * 2) - 1, w, lasty + 24, node.left);
    generateImage(depth + 1, pos * 2, w, lasty + 24, node.right);
}



/**
 * Constructs a tree based off the given array
 * @param {Array} list 
 * @returns Head of constructed tree
 */
const constructTree = (list) => {
    // TODO rework into promise?

    let queue = [];
    let head = new Node();
    head.val = list[0];

    queue.push(head);
    for (let i = 1; i < list.length; i += 2) {
        let temp = queue.shift();
        if (list[i] !== null && list[i] !== "null") {
            let left = new Node();
            left.val = list[i];
            temp.left = left;
            queue.push(left);
        }
        if (i+1 < list.length && list[i + 1] !== null && list[i + 1] !== "null") {
            let right = new Node();
            right.val = list[i + 1];
            temp.right = right;
            queue.push(right);
        }

        if (queue.length == 0) break;
    }

    return head;
}


/**
 * Tree Node util class
 */
class Node {
    constructor() {
        this.left = null;
        this.right = null;
        this.val = 0;
    }

}