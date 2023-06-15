import { AppConfig } from "@/app.config";
import axios from "axios";

export default class RequestServices {
  baseUrl = AppConfig.baseURL;
  getRequest = async (url: string) => {
    try {
      const response = await axios.get(`${this.baseUrl + url}`);
      return response;
    } catch (error) {
      console.warn(`error while fetching => ${url}`)
      console.error(error);
    }
  };
}
