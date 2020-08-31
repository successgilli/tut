import { postTask, deleteTask } from './fetch.js';

const addItem = document.getElementById('addItem');
const toggleInput = document.getElementById('toggleInput');
const send = document.getElementById('send');
const input = document.getElementById('input');
const itemDiv = document.getElementById('item_div');

const openInputField = (e) => {
    const { target } = e;
    const action = target.getAttribute('data-toggle-input');
    const instance = M.Collapsible.getInstance(toggleInput);

    if (action === 'close') {
        instance.open(0);
        target.setAttribute('data-toggle-input', 'open');
    } else {
        instance.close(0);
        target.setAttribute('data-toggle-input', 'close');
    }
};

const buildTodoItem = ({ id, name }) => {
    const item = document.createElement('div');
    const displayName = document.createElement('p');
    const actionDiv = document.createElement('div');
    const editBtn = document.createElement('i');
    const deleteBtn = document.createElement('i');

    item.setAttribute("class", "todo_item");
    item.setAttribute("id", `todo${id}`);
    displayName.textContent = name;

    deleteBtn.setAttribute("class", "material-icons");
    deleteBtn.classList.add("deleteIcons");
    deleteBtn.setAttribute("data-btn-delete", "delete");
    deleteBtn.setAttribute("data-id", id)
    deleteBtn.textContent = "delete";

    editBtn.setAttribute("class", "material-icons");
    editBtn.setAttribute("data-btn-edit", "edit");
    editBtn.setAttribute("data-id", id)
    editBtn.textContent = "edit";

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    item.appendChild(displayName);
    item.appendChild(actionDiv);

    return item;
}


const addTask = async () => {
    const task = input.value;
    const addedTask = await postTask(task);
    itemDiv.insertBefore(buildTodoItem(addedTask), itemDiv.childNodes[2].nextSibling);

    addEventToDeleteBtns();
};

const removeTask = async (e) => {
    const { target } = e;

    const deletedTaskId = await deleteTask(target.getAttribute('data-id'));
    itemDiv.removeChild(document.getElementById(`todo${deletedTaskId}`))
}

function addEventToDeleteBtns () {
    const deleteIcons = document.getElementsByClassName("deleteIcons");

    [...deleteIcons].forEach(elem => {
        elem.addEventListener('click', removeTask);
    })
};


addItem.addEventListener('click', openInputField);
send.addEventListener('click', addTask);

addEventToDeleteBtns();
