import UserList from "./components/UserList.js";
import { handleData } from "./utils/handleData.js";

function App() {
  if (!new.target) throw new Error("error: App must be called with new!");

  this.setState = (newData) => {
    this.userData = this.userData ? [...this.userData, newData] : newData;
    this.render();
  };

  this.render = () => {
    this.userList.setState(this.userData);
  };

  this.init = () => {
    try {
      this.userList = new UserList({
        onAction: {
          getUsers: handleData.onFetchUsers,
          addUser: handleData.onAddUser,
        },
      });
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

const todoApp = new App();

export const dispatch = (newData) => {
  todoApp.setState(newData);
};
