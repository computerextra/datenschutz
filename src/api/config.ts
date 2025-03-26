import axios from "axios";

const baseUrl = window.location.href;

export const client = axios.create({
  baseURL: baseUrl + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
