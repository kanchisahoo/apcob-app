import axios from "axios";

// 🔹 Default API instance
const instance = axios.create({
  baseURL: "http://15.206.10.111:3000/atrium/diagnostic-app",
});

instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=utf-8";

instance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";



// Auth API instance (for token requests)
export const authApi = axios.create({
  baseURL: "https://authorization-server-common-admin-uat-twdwtabx5q-el.a.run.app",
});



export default instance;
