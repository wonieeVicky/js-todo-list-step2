function UserList(userData, { onAction }) {
  if (!new.target) throw new Error("error: UserList must be called with new!");

  this.userData = userData;
  this.$userList = document.querySelector("#user-list");

  const mapDataToButton = (user) =>
    `<button class="ripple user ${
      user._id === this.userIdx ? "active" : ""
    }" data-idx=${user._id}>${user.name}</button>`;
  const addUserButtonDom =
    '<button class="ripple user-create-button">+ 유저 생성</button>';

  this.render = () => {
    const userListDom = this.userData.map(mapDataToButton).join(" ");
    this.$userList.innerHTML = userListDom + addUserButtonDom;
  };

  this.setState = (newData, { idx } = "") => {
    this.userData = newData;
    this.userIdx = idx;
    this.render();
  };

  this.render();

  this.$userList.addEventListener("click", (e) => {
    const {
      className,
      dataset: { idx },
    } = e.target;
    if (className.includes("user-create-button")) {
      // add User
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      if (userName.length < 2) {
        alert("이름은 최소 2글자 이상이어야 합니다.");
        return;
      }
      onAction.addUser({ name: userName });
      return;
    }
    if (className.includes("user") && idx) {
      onAction.getTodos(idx);
    }
    // get Todos
  });
}

export default UserList;
