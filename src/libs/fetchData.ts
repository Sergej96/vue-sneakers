import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export async function fetchData(url: string, params?: AxiosRequestConfig) {
    try {
      const { data } = await axios.get(url, params);
  
      return data;
    } catch (error) {
      console.log(error);
    }
  }