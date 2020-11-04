import UserList from "./components/UserList.js";
import UserTitle from "./components/UserTitle.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { getUserList, addUser, removeUser, getTodoList } from "./utils/api.js";

function App() {
  if (!new.target) throw new Error("error: App must be called with new!");

  const handleData = {
    onAddUser: async (userName) => {
      await addUser(userName);
      this.setState("userList", this.userIdx || "");
    },
    onRemoveUser: async () => {
      await removeUser(this.userIdx);
      this.setState("userList", "");
    },
    onFetchTodos: (idx) => {
      this.setState("todoList", idx);
    },
  };

  this.setState = async (type, userIdx) => {
    if (type === "userList") {
      this.userIdx = userIdx;
      this.userData = await getUserList();
      this.userList.setState(this.userData);
    }

    this.userIdx = userIdx;
    const { _id = "", name = "", todoList = [] } = await getTodoList(
      this.userIdx
    );
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
      this.todoList = new TodoList();
      this.todoCount = new TodoCount({
        onAction: { removeUser: handleData.onRemoveUser },
      });
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

const todoApp = new App();
