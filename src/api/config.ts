import axios from "axios";

const mode = import.meta.env.MODE;
console.log(mode);
const baseUrl =
  mode == "development"
    ? "https://demo.computer-extra.de/"
    : window.location.href;

export const client = axios.create({
  baseURL: baseUrl + "api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
