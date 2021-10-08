const form = document.getElementById("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");
const theme = document.querySelector(".theme");
const html = document.querySelector("html");

// Logic for Theme

theme.addEventListener("click", () => {
  if (html.getAttribute("data-theme") === "light") {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
  }
});


// Lists

let listItems = ["Complete online JavaScript course", "Jog around the park 3x", "10 minutes meditation",
  "Read for 1 hour", "Pick up groceries", "Complete Todo App on Frontend Mentor"
];
let completedItemsList = [];



function isEmpty() {
  if (listItems.length === 0) {
    list.innerHTML = "<div>👀 Todo list is empty.<br> Add your first todo above ☝️</div>"
  }
}

function del(event) {
  const listItem = event.target.previousElementSibling.innerText;
  const index = listItems.indexOf(listItem);
  const newArr = listItems.filter((item, i) => {
    return i != index
  });

  event.target.parentElement.remove();

  listItems = newArr;
  isEmpty();
}


function insertItem(listName) {
  let output = "";

  listName.forEach((item) => {
    output += `<label draggable="true">
                  <input type="checkbox" id="checkbox" onclick="onCheck(event)">
                  <span class="checkmark"></span>
                  <span class="text">${item}</span>
                  <span class="del" onclick="del(event)"></span>
              </label>`;
  });

  list.innerHTML = output + insertFooter();
}

function insertFooter(){
  const footer = `<div class="footer">
                    <div>${listItems.length} items left</div>
                    <div class="active">
                      <span onclick="showAll()">All</span>
                      <span onclick="showActive()">Active</span>
                      <span onclick="showCompleted()">Completed</span>
                    </div>
                    <div onclick="clearCompleted()">Clear Completed</div>
                  </div>`
  return footer;
}


function onSubmit(event) {
  listItems.push(input.value);
  input.value = "";

  insertItem(listItems);
  event.preventDefault();
}

form.addEventListener("submit", onSubmit);
insertItem(listItems);



function onCheck(event) {
  const checkBox = event.target;
  const item = checkBox.nextElementSibling.nextElementSibling.innerText;
  const index = completedItemsList.indexOf(item);
  const delItem = checkBox.parentElement.lastElementChild;

  if (checkBox.checked === true) {
    completedItemsList.push(item);
  } else {
    let newArr = completedItemsList.filter((completedListItem, i) => {
      return i != index
    });
    completedItemsList = newArr;
  }
  delItem.addEventListener("click", ()=>{
    completedItemsList = newArr;
  })
}






// footer functions

function showAll(){
  insertItem(listItems);
  const checkBox = document.querySelectorAll("input[type=checkbox]");
  checkBox.forEach(element => {
    if(completedItemsList.includes(element.nextElementSibling.nextElementSibling.innerText)){
      element.setAttributeNode(document.createAttribute("checked"));
    }
  });
}

function showActive() {
  const namesToDeleteSet = new Set(completedItemsList);
  const newArr = listItems.filter((name) => {
    return !namesToDeleteSet.has(name);
  });
  insertItem(newArr);
}

function showCompleted() {
  insertItem(completedItemsList);
  const checkBox = document.querySelectorAll("input[type=checkbox]");
  checkBox.forEach(element => {
    element.setAttributeNode(document.createAttribute("checked"));
  });
}

function clearCompleted(){
  const namesToDeleteSet = new Set(completedItemsList);
  const newArr = listItems.filter((name) => {
    return !namesToDeleteSet.has(name);
  });
  listItems=newArr;
  completedItemsList=[];
  insertItem(listItems);
  isEmpty();
}


// logic for Drag and Drop
// Wont work because i have used template String to insert list


//   const draggables = document.querySelectorAll('.draggable');


//   draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', () => {
//     draggable.classList.add('dragging')
//   })

//   draggable.addEventListener('dragend', () => {
//     draggable.classList.remove('dragging')
//   })
// });

// list.addEventListener('dragover', e => {
//     e.preventDefault()
//     const afterElement = getDragAfterElement(list, e.clientY)
//     const draggable = document.querySelector('.dragging')
//     if (afterElement == null) {
       // Wont work because i have used template String to insert list
//       list.appendChild(draggable)
//     } else {
//       list.insertBefore(draggable, afterElement)
//     }
//   })

// function getDragAfterElement(container, y) {
//   const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect()
//     const offset = y - box.top - box.height / 2
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child }
//     } else {
//       return closest
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element
// }