//Selecteurs
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(e) {
  //Empeche de se rafraichir 
  e.preventDefault();
  //CREATION D'UNE DIV TODO
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //CREATION D'UNE LISTE
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;


  //SAUVEGARDER DANS LE LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  
  //CREATION DU BOUTTON COMPLETED
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //CREATION DU BOUTTON TRASH
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //AJOUTER A LA LISTE
  todoList.appendChild(todoDiv);
}


function deleteTodo(e) {
  const item = e.target;

  // SUPPRIMER UN TODO
  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    //ANIMATION
    todo.classList.add("fall");
    //A LA FIN
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  // CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}


// LOCAL STORAGE
function saveLocalTodos(todo) {
    // CHECK -- Ai-je qqlch dans la todo liste
  let todos;
  if (localStorage.getItem("todos") === null) {
      // si rien tableau array vide 
    todos = [];
  } else {
      // si oui les todos seront stocké dans un tableau array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  // la nouvelle todo sera placé dans le local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}


function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Creation d'une todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Creation d'une liste
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Creation boutton completed
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Creation boutton trash 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Ajouter a la liste
    todoList.appendChild(todoDiv);
  });
}

// pour nettoyer le local storage 
// => localStorage.clear();