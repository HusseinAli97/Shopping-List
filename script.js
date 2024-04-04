const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const filter = document.getElementById("filter");
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
    // checkUi
    checkUi();
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
        confirm("Are you sure to delete this item ?") &&
            e.target.parentElement.parentElement.remove();
    }
    checkUi();
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
    if (confirm("Are you sure to Delete All items?")) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
    checkUi();
}
// clearUi
function checkUi() {
    const items = itemList.querySelectorAll("li");
    if (items.length === 0) {
        itemClear.classList.add("hideIt");
        filter.classList.add("hideIt");
    } else {
        itemClear.classList.remove("hideIt");
        filter.classList.remove("hideIt");
    }
}
// search
function filterItems(e) {
    const searchTrim = e.target.value.toLowerCase();
    const items = document.querySelectorAll("li");
    items.forEach((item) => {
        const text = item.firstChild.textContent.toLowerCase();
        if (text.includes(searchTrim)) {
            item.classList.remove("hideIt");
        } else {
            item.classList.add("hideIt");
        }
    });
}

// events
itemForm.addEventListener("submit", addItems);
itemList.addEventListener("click", delItem);
itemClear.addEventListener("click", clearAll);
filter.addEventListener("input", filterItems);
checkUi();
