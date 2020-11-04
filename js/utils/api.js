import { FETCH_BASE_URL } from "./constantKeys.js";

const fetchData = async ({ path, method, body }) => {
  const property = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    property.body = body;
  }

  const response = await fetch(`${FETCH_BASE_URL}/${path}`, property);

  if (response.status !== 200) {
    throw new Error("error: fetch response failed");
  }

  return await response.json();
};

export const getUserList = async () => {
  try {
    const response = await fetchData({
      path: "",
      method: "GET",
    });
    return response;
  } catch (e) {
    console.error("UserList를 호출하는데 실패했습니다.");
    return [];
  }
};

export const addUser = async (userName) => {
  try {
    const response = await fetchData({
      path: "",
      method: "POST",
      body: JSON.stringify(userName),
    });
    return response;
  } catch (e) {
    console.error("User를 추가하는데 실패했습니다.");
  }
};

export const removeUser = async (userId) => {
  try {
    const response = await fetchData({
      path: `${userId}`,
      method: "DELETE",
    });
    return response;
  } catch (e) {
    console.error("User를 삭제하는데 실패했습니다.");
  }
};

export const getTodoList = async (userId) => {
  try {
    const response = await fetchData({
      path: `${userId}`,
      method: "GET",
    });
    return response;
  } catch (e) {
    console.error("TodoList를 호출하는데 실패했습니다.");
    return [];
  }
};

export const addTodo = async (userId, contents) => {
  try {
    const response = await fetchData({
      path: `${userId}/items`,
      method: "POST",
      body: JSON.stringify(contents),
    });
    return response;
  } catch (e) {
    console.error("User를 추가하는데 실패했습니다.");
  }
};
