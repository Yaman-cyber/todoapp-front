import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import ListGroup from "../components/common/listGroup";
import TodoTable from "../components/todoTable";
import { closeTasks, deleteTask, getTasks } from "../services/tasksService";

import adminFilters from "../constants/filter";
import userFilter from "../constants/userFilter";

const Home = ({ user }) => {
  const [selectedFilter, setFilter] = useState(
    user.role === "admin" ? adminFilters[0] : userFilter[0]
  );

  const [filters] = useState(user.role === "admin" ? adminFilters : userFilter);
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);

  const fetchTasks = async (params) => {
    const { data } = await getTasks(params);

    setTasks(mapTasksToView(data.tasks));
    setCount(data.count);
  };

  useEffect(() => {
    fetchTasks({ filter: selectedFilter });
  }, [selectedFilter]);

  const mapTasksToView = (tasks) => {
    const newtasks = tasks.map((task) => ({
      ...task,
      isCompleted: task.isCompleted ? "Yes" : "No",
      createdAt: new Date(task.createdAt).toISOString().substring(0, 10),
      dueDate: new Date(task.dueDate).toISOString().substring(0, 10),
    }));

    return newtasks;
  };

  const handleSelect = (filter) => {
    setFilter(filter);
  };

  const handleDelete = async (task) => {
    const originalTasks = tasks;
    const newtasks = originalTasks.filter((m) => m._id !== task._id);
    setTasks(newtasks);

    try {
      await deleteTask(task._id);

      toast.success("Delete record success");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error(ex.response.data.message);

      setTasks(originalTasks);
    }
  };

  const handleClose = async () => {
    const originalTasks = tasks;
    const originlCount = count;
    const newtasks = [];
    setTasks(newtasks);
    setCount(0);

    try {
      await closeTasks();

      toast.success("Close all completed tasks success");
    } catch (ex) {
      setTasks(originalTasks);
      setCount(originlCount);
    }
  };

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={filters}
          selectedItem={selectedFilter}
          onItemSelect={handleSelect}
        />
      </div>

      <div className="col">
        {user && user.role === "admin" && (
          <Link
            to="/todo/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Todo
          </Link>
        )}

        {selectedFilter._id === "0" && (
          <button
            onClick={handleClose}
            className="btn btn-secondary"
            style={{ marginBottom: 20, marginLeft: 10 }}
          >
            CloseTodos
          </button>
        )}

        {count === 0 ? (
          <p>No open todos found in the database</p>
        ) : (
          <TodoTable user={user} tasks={tasks} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Home;
