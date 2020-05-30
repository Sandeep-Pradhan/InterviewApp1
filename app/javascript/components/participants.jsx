import React from "react";
import { Link } from "react-router-dom";

function participants() {
  return (
    <div className="container">
      <h1>From Participants Component</h1>
      <Link className="navbar-brand" to="/reactParticipants/1/show">
        Show-Participant-1
      </Link>
      <br />
      <Link className="navbar-brand" to="/reactParticipants/1/edit">
        Edit Participant-1
      </Link>
    </div>
  );
}

export default participants;
