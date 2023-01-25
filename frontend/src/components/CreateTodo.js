import React, { useState } from "react";
import axios from "axios";

export default function CreateTodo({ history }) {
  const [todo_title, setTodoTitle] = useState("");
  const [todo_description, setToDo_Desp] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    const newTodo = {
      todo_title,
      todo_description,
    };

    axios
      .post("http://localhost:8080/todos/add", newTodo)
      .then(res => console.log(res.data))
      .then(() => history.push("/"));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={todo_title}
            onChange={e => setTodoTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={todo_description}
            onChange={e => setToDo_Desp(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Todo"
          />
        </div>
      </form>
    </div>
  );
}
