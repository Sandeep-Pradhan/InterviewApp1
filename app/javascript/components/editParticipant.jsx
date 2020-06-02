import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function editParticipant() {
  const { id } = useParams();
  const [Participant, setParticipant] = useState({
    name: "",
    email: "",
    role: "Interviewer",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/participants/${id}`)
      .then((res) => {
        setParticipant(res.data);
      })
      .catch((error) => {
        console.log("Error fetching Participant", error);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setParticipant((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .patch(`/participants/${id}.json`, Participant)
      .then((res) => {
        alert("Participant Updated");
        location.href = "/reactParticipants";
      })
      .catch((error) => {
        console.log("Error Updating Participant", error);
      });
  }

  return (
    <div className="container mt-5">
      <h1>Edit Participant</h1>
      <form>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={Participant.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={Participant.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Role">Role</label>
          <select
            className="form-control"
            id="role"
            value={Participant.role}
            onChange={handleChange}
            required
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
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default editParticipant;
