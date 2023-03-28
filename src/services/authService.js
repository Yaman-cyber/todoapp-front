import http from "./httpService";
import config from "../config.json";

const loginEndpoint = config.apiUrl + "/auth/login";
const signupEndpoint = config.apiUrl + "/auth/signup";
//const profileEndpoint = config.apiUrl + "/profile";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data } = await http.post(loginEndpoint, {
    email,
    password,
  });

  localStorage.setItem(tokenKey, data.token);
  localStorage.setItem("email", data.user.email);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("_id", data.user._id);
}

async function signup(email, password) {
  const { data } = await http.post(signupEndpoint, {
    email,
    password,
  });

  localStorage.setItem(tokenKey, data.token);
}

async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("_id");
}

function getCurrentUser() {
  const user = {
    _id: localStorage.getItem("_id"),
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  };

  return user;
  ///return http.get(profileEndpoint);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  signup,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
