import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditTodo({ match: { params }, history }) {
  const [isLoading, setIsLoading] = useState(true);
  const [todo_title, setTodo_Title] = useState("");
  const [todo_description, setTodo_Description] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/todos/${params.id}`)
      .then(res => {
        const {
          todo_title,
          todo_description
        } = res.data;
        setTodo_Title(todo_title);
        setTodo_Description(todo_description);
      })
      .then(() => setIsLoading(false))
      .catch(err => {
        console.log(err);
      });
  }, [params.id]);

  const onSubmit = e => {
    e.preventDefault();

    const newTodo = {
      todo_title,
      todo_description
    };

    axios
      .post(`http://localhost:8080/todos/update/${params.id}`, newTodo)
      .then(res => console.log(res.data))
      .then(() => history.push("/"));
  };

  const deleteTodo = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/todos/delete/${params.id}`)
      .then(res => console.log(res.data))
      .then(() => history.push("/"));
  };

  return !isLoading ? (
    <div style={{ marginTop: 20 }}>
      <h3>Edit Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title </label>
          <input
            type="text"
            className="form-control"
            value={todo_title}
            onChange={e => setTodo_Title(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description </label>
          <input
            type="text"
            className="form-control"
            value={todo_description}
            onChange={e => setTodo_Description(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Edit Todo" />

          <input
            type="button"
            className="btn btn-danger float-right"
            value="Delete Todo"
            onClick={deleteTodo}
          />
        </div>
      </form>
    </div>
  ) : (
    <div>Getting Todo</div>
  );
}
