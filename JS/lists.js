const MAX = 2000000;
const MAX_INT = 2147483647;
let textarea;
let err;
let btn;
let process;
let lengthbox;
let inputtext



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

    lengthbox.placeholder = "Max " + MAX;


    btn.addEventListener("click", clicked);
}



/**
 * 
 */
const clicked = async () => {
    btn.disabled = true;
    err.innerHTML = "";
    process.innerHTML = "Generating...";

    let promise = new Promise((resolve, reject) => {
        process.innerHTML = "Generating...";

        setTimeout(() => {
            let length = lengthbox.value;
            let input = inputtext.value;
            // TODO handle larger numbers
            if (isNaN(length) || (input === "" || length === "")) {
                reject(Error("1"));
                return;
            } else {
                // TODO organize, break into functions
                length = parseInt(length);
                input = input.split(",")
                if (((input.length > MAX || length > MAX)) || (length < 0)) {
                    reject(Error("2"));
                    return;
                } else {
                    let inputSize = input.length;
                    let temp = [];
                    for (let i = 0; i < length; i++) {
                        temp.push(input[Math.floor(Math.random()*inputSize)].trim());
                    }


                    process.innerHTML = "";
                    output = "[" + temp.toString() + "]";
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


const lorem = async () => {
    
    try {
        let resp = await fetch('https://fakeapi.net/lorem');
        if (!resp.ok) {
            // error
            throw new Error(`Status: ${resp.status}`);
        }
        let text = await resp.json();
        text = (text['text']).split(' ');

        console.log(text);
        console.log(resp);
        return text;
    } catch (err) {
        return "no";
    }
    
}



const presets = async (type) => {
    switch (type) {
        case "lowercase":
            inputtext.value = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
            break;
        case "uppercase":
            inputtext.value = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
            break;
        case "allLetters":
            inputtext.value = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
            break;
        case "lorem":
            inputtext.value = await lorem();
            break;
    }
}
