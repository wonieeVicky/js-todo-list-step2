import { FETCH_BASE_URL } from "../utils/constantsKey.js";

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
    console.log(error);
    return [];
  }
};
