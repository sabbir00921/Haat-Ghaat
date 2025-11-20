import axios from "axios";
import { BaseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

export default Axios;
