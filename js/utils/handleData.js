import { dispatch } from "../App.js";
import { getUserList, addUserList } from "./api.js";

export const handleData = {
  onFetchUsers: async () => {
    const response = await getUserList();
    dispatch(response);
  },
  onAddUser: async (userName) => {
    const response = await addUserList(userName);
    dispatch(response);
  },
};
