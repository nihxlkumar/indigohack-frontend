import axios from "../api/axios";

const UserService = {
  addOrRemoveNotification: async (data) => {
    try {
      const response = await axios.put("/user/add-or-remove-notification", data);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
  storeToken: async (data) => {
    try {
      const response = await axios.put("/user/add-device-token", data);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
};

export default UserService;
