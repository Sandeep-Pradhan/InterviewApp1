import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function participants() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios
      .get("/participants")
      .then((res) => {
        setParticipants(res.data);
      })
      .catch((error) => {
        console.log("Error fetching Participants", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="page-header">
        <h1>Participants</h1>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td> {participant.name}</td>
              <td> {participant.email}</td>
              <td> {participant.role}</td>
              <td>
                <Link to={`/reactParticipants/${participant.id}/show`}>
                  Show
                </Link>
              </td>
              <td>
                <Link to={`/reactParticipants/${participant.id}/edit`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default participants;
