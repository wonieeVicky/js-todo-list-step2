import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import TodoStatus from "./components/TodoStatus.js";
import UserList from "./components/UserList.js";
import { getStorageData, setStorageData } from "./utils/handleStorage.js";
import { handleData } from "./utils/handleData.js";

function App() {
  if (!new.target) throw new Error("error: App must be called with new!");

  this.setState = (newData) => {
    const { userData = "" } = newData;
    if (userData) {
      this.render({ userData: userData });
    }
    /*
    setStorageData(newData);
    this.todos = getStorageData();
    this.status = status;
    this.fileteredTodos = handleData.onSetStatus(this.status);

    this.render(this.fileteredTodos);*/
  };

  this.render = ({ userData = "" }) => {
    if (userData) {
      this.userList.setState(userData);
    }
  };

  this.init = () => {
    this.todos = getStorageData();

    try {
      this.userList = new UserList({
        onAction: { getUsers: handleData.onFetchUsers },
      });
      this.todoInput = new TodoInput({ onAction: { add: handleData.onAdd } });
      this.todoList = new TodoList({
        onAction: {
          toggle: handleData.onToggle,
          remove: handleData.onRemove,
          change: handleData.onChange,
        },
      });
      this.todoCount = new TodoCount();
      this.todoStatus = new TodoStatus({
        onAction: { bind: handleData.onBindStatus },
      });
      this.render(this.todos);
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
