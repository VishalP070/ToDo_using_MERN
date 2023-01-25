import React from "react";
import { Link } from "react-router-dom";

export default function Todo({ todo }) {


  return (
    <tr>
      <td>{todo.todo_title}</td>
      <td>
        {todo.todo_description}
      </td>
      <td>
        <Link to={`/edit/${todo._id}`}>Edit/Delete</Link>
      </td>
      
  
    </tr>
  );
}
