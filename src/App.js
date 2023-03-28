import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Chat from "./pages/chat";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Signup from "./pages/signup";
import Todo from "./pages/todo";

import Logout from "./components/logout";
import PrivateRoute from "./components/common/privateRoute";
import NavBar from "./components/navBar";
import auth from "./services/authService";

function App() {
  const user = auth.getCurrentUser();

  return (
    <>
      <ToastContainer />
      <main className="container">
        <NavBar user={auth.getJwt()} />
        <Routes>
          <Route path="/chat" element={<PrivateRoute />}>
            <Route path="/chat" element={<Chat user={user} />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/todo" replace />} />
          <Route path="/todo" element={<PrivateRoute />}>
            <Route path="/todo" element={<Home user={user} />} />
          </Route>
          <Route path="/todo/:id" element={<PrivateRoute />}>
            <Route path="/todo/:id" element={<Todo user={user} />} />
          </Route>
          <Route path="/todo/new" element={<PrivateRoute role={user.role} />}>
            <Route path="/todo/new" element={<Todo user={user} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
