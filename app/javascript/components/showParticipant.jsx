import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function showParticipant() {
  const { id } = useParams();
  const [participant, setParticipant] = useState("");

  useEffect(() => {
    axios
      .get(`/participants/${id}`)
      .then((res) => {
        setParticipant(res.data);
      })
      .catch((error) => {
        console.log("Error fetching Participant", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1> {participant.name} </h1>
        <p> Email: {participant.email} </p>
        <p> Role: {participant.role} </p>

        <div className="actions mt-4">
          <Link className="btn btn-primary mr-3" to={`/reactParticipants`}>
            Participants
          </Link>
          <Link
            className="btn btn-primary"
            to={`/reactParticipants/${participant.id}/edit`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default showParticipant;
