import React from "react";
import { Link } from "react-router-dom";

function interviews() {
  return (
    <div className="container">
      <h1>From Interviews Component</h1>
      <Link className="navbar-brand" to="/reactInterviews/1/show">
        Show-Interview-1
      </Link>
      <br />
      <Link className="navbar-brand" to="/reactInterviews/1/edit">
        Edit Interview-1
      </Link>
      <br />
      <Link className="navbar-brand" to="/reactInterviews/new">
        New Interview
      </Link>
    </div>
  );
}

export default interviews;
