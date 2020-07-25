import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addParticipant as addParticipantAction } from "../redux/actions/participantActions";

function addParticipant() {
  var participant = {
    name: "",
    email: "",
    role: "Interviewee",
  };
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addParticipantAction(participant));
    location.href = "/reactParticipants";
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
            onChange={(e) => (participant.name = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            className="form-control"
            id="Email"
            placeholder="Enter email"
            onChange={(e) => (participant.email = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Role">Role</label>
          <select
            className="form-control"
            id="Role"
            defaultValue={participant.role}
            onChange={(e) => (participant.role = e.target.value)}
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
