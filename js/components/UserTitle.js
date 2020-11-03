function UserTitle() {
  if (!new.target) throw new Error("error: function must be called with new!");

  this.$userTitle = document.querySelector("#user-title span");

  this.render = () => {
    this.$userTitle.innerHTML = `<strong>${this.name}</strong>'s Todo List`;
  };

  this.setState = (name) => {
    this.name = name;
    this.render();
  };
}

export default UserTitle;
