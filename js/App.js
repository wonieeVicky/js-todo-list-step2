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
  toggleTodo,
} from "./utils/api.js";
import TodoInput from "./components/TodoInput.js";
import { STATUS } from "./utils/constantKeys.js";

function App() {
  if (!new.target) throw new Error("error: App must be called with new!");

  const handleData = {
    onAddUser: async (userName) => {
      await addUser(userName);
      this.setState("userList", this.userId || "");
    },
    onRemoveUser: async () => {
      await removeUser(this.userId);
      this.setState("userList", "");
    },
    onFetchTodos: (userId) => {
      this.setState("todoList", userId);
    },
    onAddTodo: async (contents) => {
      if (!this.userId) {
        alert("유저를 먼저 선택해주세요.");
        return;
      }
      await addTodo(this.userId, contents);
      this.setState("todoList", this.userId);
    },
    onToggleTodo: async (itemId) => {
      await toggleTodo(this.userId, itemId);
      this.setState("todoList", this.userId);
    },
    onBindTodo: (status) => {
      this.setState("todoList", this.userId, { status });
    },
    onSetStatus: (status, todoList) => {
      const todosBy = {
        [STATUS.ACTIVE]: todoList.filter((todo) => !todo.isCompleted),
        [STATUS.COMPLETED]: todoList.filter((todo) => todo.isCompleted),
      };
      return todosBy[status] || todoList;
    },
  };

  this.setState = async (
    type,
    userId,
    { status = this.status || "all" } = ""
  ) => {
    if (type === "userList") {
      this.userId = userId;
      this.userData = await getUserList();
      this.userList.setState(this.userData);
    }

    this.userId = userId;
    this.status = status;
    const { _id = "", name = "", todoList = [] } = await getTodoList(
      this.userId
    );
    this.filteredTodoList = handleData.onSetStatus(this.status, todoList);

    this.userList.setState(this.userData, { idx: _id });
    this.userTitle.setState(name);
    this.todoList.setState(this.filteredTodoList);
    this.todoCount.setState(this.filteredTodoList);
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
      this.todoList = new TodoList({
        onAction: { toggleTodo: handleData.onToggleTodo },
      });
      this.todoCount = new TodoCount({
        onAction: {
          removeUser: handleData.onRemoveUser,
          bindTodo: handleData.onBindTodo,
        },
      });
      this.todoInput = new TodoInput({
        onAction: {
          addTodo: handleData.onAddTodo,
        },
      });
    } catch (e) {
      console.log(error);
    }
  };

  this.init();
}

const todoApp = new App();
