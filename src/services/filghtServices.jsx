import axios from '../api/axios';

const FlightService = {
  all: async () => {
    try {
      const response = await axios.get("/flight/all");
      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },
  getFlightDetails: async (id) => {
    try {
      const response = await axios.get( `/flight/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },
  addFlight: async (data) => {
    try {
      const response = await axios.post("/admin/add-flight", data);
      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },
  updateFlight: async (data) => {
    try {
      const response = await axios.put("/admin/update-flight", data);
      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },
};

export default FlightService;
