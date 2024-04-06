const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const filter = document.getElementById("filter");
const formBtn = document.querySelector(".btn");
const darkMode = document.querySelector(".modes");
const dark = document.getElementById("darkMode");
const light = document.getElementById("lightMode");
let isEditMode = false;
// display items from storage
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    const mode = getDarkModeStatus();
    itemsFromStorage.forEach((item) => {
        addItemToDOM(item);
    });
    checkUi();
    toggleModes(mode);
}
// add
function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value;
    // checkEditMode
    if (isEditMode) {
        const itemToEdit = document.querySelector(".editMode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove("editMode");
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkDuplicate(newItem)) {
            if (!confirm("item Already exist are you sure to add again?")) {
                return;
            }
        }
    }

    // add to dom
    addItemToDOM(newItem);
    // add to local
    addItemToStorage(newItem);
    // checkUi
    checkUi();
}
function addItemToDOM(newItem) {
    if (newItem === "") {
        itemInput.style.outline = "1px solid red";
        itemInput.setAttribute("placeholder", "Please Add Item");
    } else {
        itemInput.removeAttribute("style");
        itemInput.setAttribute("placeholder", "Enter Item");
        // create items
        const item = createItem(newItem);
        itemList.appendChild(item);
        // clear Input
        itemInput.value = "";
    }
}
function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    return itemsFromStorage;
}
function onClickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        delItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}
function setItemToEdit(item) {
    isEditMode = true;
    itemList
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("editMode"));
    item.classList.add("editMode");
    formBtn.classList.add("update");
    formBtn.innerHTML = `
    <i class='fa-solid fa-pen'></i>
    Update Item
    `;
    itemInput.value = item.textContent;
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
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    item !== "" && itemsFromStorage.push(item);
    // convert to stringify
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
// checkDuplicate
function checkDuplicate(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}
//delete
function delItem(item) {
    if (confirm("Are You Sure Delete This item?")) {
        item.remove();

        // remove from storage
        removeItemFromStorage(item.textContent);

        checkUi();
    }
}
// removeItemFromStorage
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
function clearAll(e) {
    if (confirm("Are you sure to Delete All items?")) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
    // clear Localstorage
    localStorage.removeItem("items");
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
    formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    formBtn.classList.remove("update");
    isEditMode = false;
}
// darkMode Stats
function getDarkModeStatus() {
    let isDarkMode;
    if (localStorage.getItem("mode") === null) {
        localStorage.setItem("mode", "lightMode");
    } else {
        isDarkMode = localStorage.getItem("mode");
    }
    return isDarkMode;
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
// darkMode
function switchModes(e) {
    if (e.target.parentElement.id === "darkMode") {
        localStorage.setItem("mode", "darkMode");
        toggleModes("darkMode");
    } else if (e.target.parentElement.id === "lightMode") {
        localStorage.setItem("mode", "lightMode");
        toggleModes("lightMode");
    }
}
function toggleModes(mode) {
    if (mode === "darkMode") {
        dark.classList.add("hideIt");
        light.classList.remove("hideIt");
        document.body.classList.add("darkMode");
    } else {
        dark.classList.remove("hideIt");
        light.classList.add("hideIt");
        document.body.classList.remove("darkMode");
    }
}

// IFFE
(function () {
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    itemClear.addEventListener("click", clearAll);
    filter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);
    darkMode.addEventListener("click", switchModes);
    checkUi();
})();
