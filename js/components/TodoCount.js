function TodoCount({ onAction }) {
  if (!new.target) throw new Error("error: TodoList must be called with new!");

  this.$button = document.querySelector(".count-container");
  this.$count = document.querySelector(".todo-count strong");
  this.$filter = document.querySelector("ul.filters");

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => (this.$count.innerHTML = this.todos.length);

  this.$button.addEventListener("click", (e) => {
    const { className, tagName } = e.target;
    if (tagName === "BUTTON" && className.includes("user-clear-completed")) {
      onAction.removeUser();
    }
  });

  this.$filter.addEventListener("click", (e) => {
    const [selectedStatus] = e.target.classList;

    const $el = this.$filter.querySelector(`.${selectedStatus}`);
    const isAlreadyBinding = $el.classList.contains("selected");
    if (!isAlreadyBinding) {
      this.$filter.querySelector(".selected").classList.remove("selected");
      this.$filter
        .querySelector(`.${selectedStatus}`)
        .classList.add("selected");
      onAction.bindTodo(`${selectedStatus}`);
    }
  });
}

export default TodoCount;
