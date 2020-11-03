function UserList({ onAction }) {
  if (!new.target) throw new Error("error: UserList must be called with new!");

  this.$userList = document.querySelector("#user-list");

  const mapDataToButton = (user) =>
    `<button class="ripple" data-idx=${user._id}>${user.name}</button>`;
  const addUserButtonDom =
    '<button class="ripple user-create-button">+ 유저 생성</button>';

  this.render = () => {
    const userListDom = this.userData.map(mapDataToButton).join(" ");
    this.$userList.innerHTML = userListDom + addUserButtonDom;
  };

  this.setState = (userData) => {
    this.userData = userData;
    this.render();
  };

  this.init = (() => {
    onAction.getUsers();
  })();

  this.$userList.addEventListener("click", (e) => {
    const { className } = e.target;
    if (className.includes("user-create-button")) {
      // add User
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      if (userName.length < 2) {
        alert("이름은 최소 2글자 이상이어야 합니다.");
        return;
      }
      onAction.addUser({ name: userName });
      return;
      // get Todos
    }
  });
}

export default UserList;
