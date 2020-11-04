function UserTitle() {
  if (!new.target) throw new Error("error: function must be called with new!");

  this.$userTitle = document.querySelector("#user-title span");

  this.render = () => {
    const htmlString = this.name
      ? `<strong>${this.name}</strong>'s Todo List`
      : "유저를 선택해주세요.";
    this.$userTitle.innerHTML = htmlString;
  };

  this.setState = (name) => {
    this.name = name;
    this.render();
  };
}

export default UserTitle;
