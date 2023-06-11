import axios from "axios";
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const locale = localStorage.getItem("last-locale") || "en";
const instance = axios.create({
  baseURL: backendurl,
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
