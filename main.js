import { todos } from './data/todos.js';

console.log(todos);

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
document.querySelector('#root').innerHTML = divString;
