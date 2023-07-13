import { todos } from './data/todos.js';

const todosCopy = [...todos];

const renderToDom = (divId, domString) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = domString;
};

const pageLayout = () => {
  const divString = `
    <h1 id="head" class="head">My Todo App</h1>
    <form class="todo-form" id="todoForm">
      <button 
        type="submit" 
        class="btn btn-secondary btn-sm" 
        id="submitBtn"
      >
        Add a ToDo
      </button>
      <input 
        class="form-control form-control-sm todo-input" 
        type="text" 
        placeholder="Name" 
        id="todoInput"
        autocomplete="off"
        required
      >
    </form>
  <div class="todo-lists">
    <div class="todos-wrapper">
      <h3>Tasks To Do</h3>
      <div class="todos" id="todos"></div>
    </div>
    <div class="completed-wrapper">
      <h3>Tasks Completed</h3>
      <div class="completed" id="completed"></div>
    </div>
  </div>
`
  renderToDom('#root', divString);
};

const cardsOnDom = (arr, divID) => {
  let cardString = '';
  arr.forEach(todo => {
    cardString += `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${todo.title}</h5>
        ${todo.done === false
        ? `<button type="button" class="btn btn-success btn-sm" id="doneBtn--${todo.id}">Done</button>`
        : ''}
        <button type="button" class="btn btn-danger btn-sm" id="deleteBtn--${todo.id}">Delete</button>
      </div>
    </div>
    `
  });
  renderToDom(divID, cardString)
}

const allCardsOnPage = () => {
  const todos = todosCopy.filter(todo => todo.done === false);
  const completed = todosCopy.filter(todo => todo.done === true);
  cardsOnDom(todos, '#todos')
  cardsOnDom(completed, '#completed')
};

const startApp = () => {
  pageLayout();
  allCardsOnPage();
}

startApp();

document.querySelector("#root").addEventListener('click', (e) => {
  const [, todoId] = e.target.id.split('--');
  const todoIndex = todosCopy.findIndex(obj => obj.id === Number(todoId));

  if (e.target.id.includes('doneBtn')) {
    const todo = todosCopy[todoIndex]
    todo.done = true
    allCardsOnPage();
  }
  if (e.target.id.includes('deleteBtn')) {
    todosCopy.splice(todoIndex, 1);
    allCardsOnPage();
  }
})

document.querySelector("#todoForm").addEventListener('submit', (e) => {
  e.preventDefault();
  const formValue = document.querySelector('#todoInput').value;
  const todoObj = {
    id: Date.now(),
    title: formValue,
    done: false
  }
  todosCopy.push(todoObj);
  allCardsOnPage();
  document.querySelector("#todoForm").reset();
})
