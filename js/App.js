import UserList from "./components/UserList.js";
import UserTitle from "./components/UserTitle.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import {
  getUserList,
  addUser,
  removeUser,
  getTodoList,
  addTodo,
} from "./utils/api.js";
import TodoInput from "./components/TodoInput.js";

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
    onFetchTodos: (userId) => {
      this.setState("todoList", userId);
    },
    onAddTodo: async (contents) => {
      if (!this.userIdx) {
        alert("유저를 먼저 선택해주세요.");
        return;
      }
      await addTodo(this.userIdx, contents);
      this.setState("todoList", this.userIdx);
    },
  };

  this.setState = async (type, userId) => {
    if (type === "userList") {
      this.userIdx = userId;
      this.userData = await getUserList();
      this.userList.setState(this.userData);
    }

    this.userIdx = userId;
    const { _id = "", name = "", todoList = [] } = await getTodoList(
      this.userIdx
    );
    this.userList.setState(this.userData, { idx: _id });
    this.userTitle.setState(name);
    this.todoList.setState(todoList);
    this.todoCount.setState(todoList);
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
      this.todoInput = new TodoInput({
        onAction: { addTodo: handleData.onAddTodo },
      });
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

const todoApp = new App();
