import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/task";

function taskUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTasks(params) {
  let url = apiEndpoint;
  if (params.filter) url = apiEndpoint + `?select=${params.filter._id}`;

  return http.get(url);
}

export function getTask(taskId) {
  return http.get(taskUrl(taskId));
}

export function saveTask(task) {
  if (task._id) {
    const body = { ...task };
    delete body._id;
    return http.put(taskUrl(task._id), body);
  }

  return http.post(apiEndpoint, task);
}

export function closeTasks() {
  return http.post(apiEndpoint + "/close");
}

export function deleteTask(taskId) {
  return http.delete(taskUrl(taskId));
}
