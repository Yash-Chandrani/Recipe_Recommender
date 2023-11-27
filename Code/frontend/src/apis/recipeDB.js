import axios from "axios";

export default axios.create({
  // baseURL: "https://localhost:5000/api/v4/",
  baseURL: "http://localhost:5000/api/v4",
});
