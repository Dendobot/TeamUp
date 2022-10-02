import axios from 'axios';
const BASE_URL_DEV = "http://localhost:3500";
export const baseUrl =
  window.location.hostname.split(":")[0] === "localhost" ? BASE_URL_DEV : "";

export default axios.create({
  baseURL: baseUrl
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});