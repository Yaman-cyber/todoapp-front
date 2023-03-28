import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 403) {
    const navigate = useNavigate();
    navigate("/login");
  }

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    console.log(error);
    toast.error(error.response.data.message);
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
