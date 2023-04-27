let todos = [];
const TODO_KEY = 'TODO_KEY';


const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day')
let editingIndex;

function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');    
    element.classList.add('todo');
    if (index == editingIndex) {
      element.innerHTML = `<div class="todo__day">Редактирование</div>
      <form class="todo__form" onsubmit="saveEdit(event)">
        <input name="comment" class="input_icon" type="text" placeholder="Нужно сделать" value = "${todos[index]}"/>
        <img class="input__icon" src="./images/comment.svg" alt="Иконка" />
        <button class="button" type="submit">Сохранить</button>
      </form> </div>`
    } else {
      element.innerHTML = `<div class="todo__day">Дело ${Number(index) + 1}</div>
                <span> <div class="todo__comment">${todos[index]}</div> </span> <input type="checkbox">
                <button class="todo__delete" onclick="deleteTodo(${index})">
                  <img src="./images/delete.svg" alt="Удалить дело ${index + 1}" />
                </button>
                <button class="todo__edit" onclick="editTodo(${index})">
                  <img src="./images/pencil.svg" alt="Отредактировать дело ${index + 1}" />
                </button>`;
    }
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
  check();
}


/* work with todos */
function addTodo(event) {
  event.preventDefault();
  
  const data = event.target['comment'].value
  if (!data) {
    return;
  }
  
  todos.push(data)
  event.target['comment'].value = '';
  
  rerender();
  saveData();
}

function check() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const todo = document.querySelectorAll('.todo');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
      if (checkboxes[i].checked) {
        todo[i].classList.add('completed');
      } else {
        todo[i].classList.remove('completed');
      }
    });
  }
}

function editTodo(index) {
  editingIndex = index;
  rerender();
}

function saveEdit(event) {
  const newData = event.target['comment'].value
  if (!newData) {
    return;
  }
  todos[editingIndex] = newData;
  editingIndex = -1;
  rerender();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

/* init */
(() => {
  loadData();
  rerender();
})();