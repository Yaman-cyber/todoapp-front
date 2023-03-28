import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/chat";

export function getChats() {
  return http.get(apiEndpoint);
}

export function getChat(chatId) {
  return http.get(apiEndpoint + `/${chatId}`);
}

export function addMessage(message) {
  const body = { ...message };
  return http.post(apiEndpoint + `/${message.chatId}/message`, body);
}
