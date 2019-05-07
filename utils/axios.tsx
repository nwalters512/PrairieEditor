import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: "/api",
  headers: {
    "Private-Token": "3daa00ec-ef0d-4196-a0e1-13cca272dd1c"
  }
});

export default axios;
