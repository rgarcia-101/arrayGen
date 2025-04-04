

const navbarGen = () => {
    let div = document.createElement("div");
    let list = document.querySelector("#navbar-nav")

    // List items
    let li1 = document.createElement("li"); 
    let trees = document.createElement("a");

    let li2 = document.createElement("li"); 
    let arrays = document.createElement("a");

    let li3 = document.createElement("li"); 
    let matrices = document.createElement("a");

    arrays.href = "arrays.html";
    arrays.innerHTML = "Array Generator";

    matrices.href = "matrix.html";
    matrices.innerHTML = "Matrix Generator";

    trees.href = "trees.html";
    trees.innerHTML = "Binary Trees";

    li1.appendChild(arrays);
    li2.appendChild(matrices);
    li3.appendChild(trees);

    list.appendChild(li1);
    list.appendChild(li2);
    list.appendChild(li3);
}