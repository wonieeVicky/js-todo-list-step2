import { PRIORITY } from "../utils/constantKeys.js";

function TodoList() {
  if (!new.target) throw new Error("error: TodoList must be called with new!");

  this.$list = document.querySelector(".todo-list");

  const mapPriority = {
    [PRIORITY.NONE]: `<select class="chip select"><option value="0" selected>순위</option><option value="1">1순위</option><option value="2">2순위</option></select>`,
    [PRIORITY.FIRST]: `<span class="chip primary">1순위</span>`,
    [PRIORITY.SECOND]: `<span class="chip secondary">2순위</span>`,
  };

  const createTodoList = (todo) => {
    const { _id, contents, isCompleted, priority } = todo;
    return `
      <li data-idx=${_id} class=${isCompleted ? "completed" : ""}>
        <div class="view">
          <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""}>
          <label class="label">
          ${mapPriority[priority]}
          <span class="contents">${contents}</span></label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}">
      </li>`;
  };

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => {
    this.$list.innerHTML = this.todos.map(createTodoList).join("");
  };
}

export default TodoList;
