import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
//import Like from "./common/like";

const TodoTable = (props) => {
  const { tasks, user } = props;

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (task) => <Link to={`/todo/${task._id}`}>{task.title}</Link>,
    },
    { path: "description", label: "Description" },
    { path: "createdAt", label: "Created" },
    { path: "dueDate", label: "Due Date" },
    { path: "priority", label: "Priority" },
    { path: "assignedTo.email", label: "Assigned To" },
    { path: "isCompleted", label: "Completed" },
  ];

  const deleteColoumn = {
    key: "delete",
    content: (task) => (
      <button
        onClick={() => props.onDelete(task)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  if (user && user.role === "admin") columns.push(deleteColoumn);

  return <Table columns={columns} data={tasks} />;
};

export default TodoTable;
