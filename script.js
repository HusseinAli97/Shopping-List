const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
// add
function addItems(e) {
    e.preventDefault();
    let newItem = itemInput.value;

    // validate input
    if (newItem === "") {
        itemInput.style.outline = "1px solid red";
        itemInput.setAttribute("placeholder", "Please Add Item");
    } else {
        itemInput.removeAttribute("style");
        itemInput.setAttribute("placeholder", "Enter Item");
    }
    // create items
    const item = createItem(newItem);
    itemList.appendChild(item);
    // clear Input
    itemInput.value = "";
}
function createItem(newItem) {
    // create List item
    const li = document.createElement("li");
    const btn = createBtn("remove-item btn-link text-red");
    // append child
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(btn);

    return li;
}
function createBtn(classes) {
    const btn = document.createElement("button");
    const icon = createIcon("fa-solid fa-xmark");
    // add classes
    btn.className = classes;
    // append child
    btn.appendChild(icon);
    return btn;
}
function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

//delete
function delItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        e.target.parentElement.parentElement.remove();
    }
}
function clearAll(e) {
    const items = document.querySelectorAll("ul li");
    // if (items !== null) {
    //     items.forEach((element)=>{
    //         element.remove()
    //     })
    //     return
    // }
    // itemList.innerHTML = "";
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
}
// events
itemForm.addEventListener("submit", addItems);
itemList.addEventListener("click", delItem);
itemClear.addEventListener("click", clearAll);
