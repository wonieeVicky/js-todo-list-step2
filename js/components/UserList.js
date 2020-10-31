function UserList({ onAction }) {
  if (!new.target) throw new Error("error: UserList must be called with new!");

  this.$userList = document.querySelector("#user-list");

  const mapDataToButton = (user) =>
    `<button class="ripple" data-idx=${user._id}>${user.name}</button>`;
  const addUserButtonDom =
    '<button class="ripple user-create-button">+ 유저 생성</button>';

  this.render = () => {
    const userListDom = this.userData.map(mapDataToButton).join("");
    this.$userList.innerHTML = userListDom + addUserButtonDom;
  };

  this.setState = (userData) => {
    this.userData = userData;
    this.render();
  };

  this.init = (() => {
    onAction.getUsers();
  })();
}

export default UserList;
