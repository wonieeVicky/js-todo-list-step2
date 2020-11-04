function TodoCount({ onAction }) {
  if (!new.target) throw new Error("error: TodoList must be called with new!");

  this.$count = document.querySelector(".count-container");

  this.$count.addEventListener("click", (e) => {
    const { className, tagName } = e.target;
    if (tagName === "BUTTON" && className.includes("user-clear-completed")) {
      onAction.removeUser();
    }
  });
}

export default TodoCount;
