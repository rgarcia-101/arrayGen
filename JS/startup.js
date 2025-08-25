

const headerGen = () => {
    // let div = document.createElement("div");
    let list = document.querySelector("#navbar-nav")

    // List items
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");
    let li4 = document.createElement("li");
    let li5 = document.createElement("li");


    let trees = document.createElement("a");
    let arrays = document.createElement("a");
    let matrices = document.createElement("a");
    let lists = document.createElement("a");
    let cmatrix = document.createElement("a");

    arrays.href = "/arrays.html";
    arrays.innerHTML = "Array Generator";

    matrices.href = "/matrix.html";
    matrices.innerHTML = "Matrix Generator";

    trees.href = "/trees.html";
    trees.innerHTML = "Binary Trees";

    lists.href = "/lists.html"
    lists.innerHTML = "Custom Array"

    cmatrix.href = "/cmatrix.html";
    cmatrix.innerHTML = "Custom Matrix";



    li1.appendChild(arrays);
    li2.appendChild(matrices);
    li3.appendChild(lists);
    li4.appendChild(cmatrix);
    li5.appendChild(trees);

    list.appendChild(li1);
    list.appendChild(li2);
    list.appendChild(li3);
    list.appendChild(li4);
    list.appendChild(li5);
}