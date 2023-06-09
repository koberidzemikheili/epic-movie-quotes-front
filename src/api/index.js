import axios from "axios";
const locale = localStorage.getItem("last-locale") || "en";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": locale,
  },
});
export default instance;
