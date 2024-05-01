const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '2022-12-22'
},{
  name: 'watch korean movies',
  dueDate: '2023-1-18'
}];

renderTodoList();

function renderTodoList(){
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index){
    const {name, dueDate} = todoObject; 

    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${index},1);
        renderTodoList();
        saveToStorage();
      " class="delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  
  const dateInputElement = document.querySelector('.js-due-date-input');

  const dueDate = dateInputElement.value;

  todoList.push({
    // name: name,
    // dueDate: dueDate
    // short hand property
    name,
    dueDate
  });

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();

  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('todoList',JSON.stringify(todoList));
}
