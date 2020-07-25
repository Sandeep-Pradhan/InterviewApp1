import React from "react";
import { Link } from "react-router-dom";

function header() {
  return (
    <nav className="navbar navbar-light bg-light d-flex">
      <div className="container">
        <div className="logo">
          <Link className="navbar-brand" to="/">
            InterviewApp1
          </Link>
        </div>

        <div>
          <Link className="navbar-brand" to="/reactParticipants/new">
            Add Participants
          </Link>
          <Link className="navbar-brand" to="/reactParticipants">
            Participants
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default header;
