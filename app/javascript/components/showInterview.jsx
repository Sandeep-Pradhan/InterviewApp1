import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function showInterview() {
  const { id } = useParams();
  const [Interview, setInterview] = useState({ participants: [] });

  useEffect(() => {
    axios
      .get(`/interviews/${id}`)
      .then((res) => {
        setInterview(res.data);
      })
      .catch((error) => {
        console.log("Error fetching Interview", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1> {Interview.round} </h1>
        <h4> Start Time: {Interview.starts_at} </h4>
        <h4> End Time: {Interview.ends_at} </h4>
        <h4> Participants: </h4>
        <ul>
          {Interview.participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>

        <div className="actions mt-4">
          <Link className="btn btn-primary mr-3" to={`/`}>
            Interviews
          </Link>
          <Link
            className="btn btn-primary"
            to={`/reactInterviews/${Interview.id}/edit`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default showInterview;
