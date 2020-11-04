function TodoCount({ onAction }) {
  if (!new.target) throw new Error("error: TodoList must be called with new!");

  this.$button = document.querySelector(".count-container");
  this.$count = document.querySelector(".todo-count strong");

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
}

export default TodoCount;
