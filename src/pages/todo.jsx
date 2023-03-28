import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import CheckBox from "../components/common/checkBox";
import Select from "../components/common/select";
import Input from "../components/common/input";

import priorities from "../constants/priority";

import { getUsers } from "../services/userServices";
import { getTask, saveTask } from "../services/tasksService";

const schema = Joi.object({
  _id: Joi.string().optional(),
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  dueDate: Joi.date(),
  priority: Joi.string().valid("low", "medium", "high"),
  assignedTo: Joi.string().optional(),
  isCompleted: Joi.bool().optional(),
});

const Todo = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedTo: "",
    isCompleted: false,
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [disabledCheckBox, setDisabledCheckBox] = useState(false);

  const fetchUsers = async () => {
    const { data } = await getUsers();

    setUsers(data.users);
  };

  const populateTodo = async () => {
    const taskId = id;
    if (!taskId || taskId === "new") return;

    const { data } = await getTask(taskId);

    if (data.task.closed) setDisabledCheckBox(true);

    setData(mapToViewModel(data.task));
  };

  useEffect(() => {
    if (user && user.role === "user") setReadOnly(true);

    fetchUsers();
    populateTodo();
  }, []);

  const mapToViewModel = (task) => {
    return {
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().substring(0, 10),
      priority: task.priority,
      assignedTo: task.assignedTo._id,
      isCompleted: task.isCompleted,
    };
  };

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
      const response = await saveTask(data);

      toast.success(response.data.message);

      navigate("/");
    }
  };

  return (
    <div>
      <h1>Todo Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          name="title"
          type="text"
          readOnly={readOnly}
          value={data.title}
          error={errors.title}
          onChange={handleChange}
        />
        <Input
          label="description"
          name="description"
          type="text"
          readOnly={readOnly}
          value={data.description}
          error={errors.description}
          onChange={handleChange}
        />
        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          readOnly={readOnly}
          defaultValue={data.dueDate}
          error={errors.dueDate}
          onChange={handleChange}
        />
        <Select
          name="priority"
          value={data.priority}
          label="Priority"
          disabled={readOnly}
          options={priorities}
          onChange={handleChange}
          error={errors.priority}
        />
        <Select
          name="assignedTo"
          valueName="email"
          value={data.assignedTo}
          disabled={readOnly}
          label="Assigned To"
          options={users}
          onChange={handleChange}
          error={errors.assignedTo}
        />

        <CheckBox
          name="isCompleted"
          label="Completed"
          value={!data.isCompleted}
          checked={data.isCompleted}
          disabled={disabledCheckBox}
          onChange={handleChange}
          error={errors.isCompleted}
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Todo;
