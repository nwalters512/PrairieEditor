import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: "/api",
  headers: {
    "Private-Token": "9ff1d129-d1b8-4d64-98f8-0225d156d0a5"
  }
});

export default axios;
