import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getParticipant,
  editParticipant as editParticipantAction,
} from "../redux/actions/participantActions";

function editParticipant() {
  const { id } = useParams();
  var Participant = useSelector((state) => state.participants[id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipant(id));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    Participant[id] = value;
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editParticipantAction(id, Participant));
    location.href = "/reactParticipants";
  }

  return (
    <div className="container mt-5">
      {Participant ? (
        <>
          <h1>Edit Participant</h1>
          <form>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                defaultValue={Participant.name}
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
                defaultValue={Participant.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Role">Role</label>
              <select
                className="form-control"
                id="role"
                defaultValue={Participant.role}
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
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default editParticipant;
