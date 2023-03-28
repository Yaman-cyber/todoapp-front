import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "../components/common/input";
import auth from "../services/authService";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);

    const { error } = schema.validate(newData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
    } else {
      await auth.login(data.email, data.password);

      window.location = "/";
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={data.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={data.password}
          error={errors.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
