import UserList from "./components/UserList.js";
import UserTitle from "./components/UserTitle.js";
import { getUserList, addUserList, getTodoList } from "./utils/api.js";

function App() {
  if (!new.target) throw new Error("error: App must be called with new!");

  const handleData = {
    onAddUser: async (userName) => {
      const response = await addUserList(userName);
      const originUsers = this.userData || [];
      this.userData = [...originUsers, response];
      this.userList.setState(this.userData);
    },
    onFetchTodos: (idx) => {
      this.setState(idx);
    },
  };

  this.setState = async (userIdx) => {
    this.userIdx = userIdx;
    const { _id, name, todoList } = await getTodoList(this.userIdx);
    this.userList.setState(this.userData, { idx: _id });
    this.userTitle.setState(name);
    this.todoList.setState(todoList);
  };

  this.init = async () => {
    this.userData = await getUserList();

    try {
      this.userTitle = new UserTitle();
      this.userList = new UserList(this.userData, {
        onAction: {
          addUser: handleData.onAddUser,
          getTodos: handleData.onFetchTodos,
        },
      });
      // this.todoList = new TodoList();
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

const todoApp = new App();
