import axios from "axios";
import { BASE_URL } from "./constants";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;

export default axiosInstance;

export const axiosThirdParty = axios.create({
  baseURL: "https://non-mortgage-now-sit.loanworkssoftware.com.au/api",
});
