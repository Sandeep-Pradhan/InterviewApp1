import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function addParticipant() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Interviewee");

  function handleSubmit(e) {
    e.preventDefault();
    const participant = {
      name,
      email,
      role,
    };
    axios
      .post("/participants", { participant })
      .then((res) => {
        alert("Participant Added");
        location.href = "/";
      })
      .catch((error) => {
        console.log("Error Adding Participant", error);
      });
  }

  return (
    <div className="container mt-5">
      <h1>Add Participant</h1>
      <form>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="form-control"
            id="Name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            className="form-control"
            id="Email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Role">Role</label>
          <select
            className="form-control"
            id="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Interviewer">Interviewer</option>
            <option value="Interviewee">Interviewee</option>
          </select>
        </div>

        <div className="actions mt-4">
          <Link className="btn btn-primary mr-3" to={`/reactParticipants`}>
            Participants
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default addParticipant;
