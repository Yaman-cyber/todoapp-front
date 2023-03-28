import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/user";

export function getUsers() {
  return http.get(apiEndpoint);
}
