import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckboxGroup from "react-checkbox-group";
import { getParticipants } from "../redux/actions/participantActions";
import {
  getInterview,
  editInterview as editInterviewAction,
} from "../redux/actions/interviewActions";

function editInterview() {
  const { id } = useParams();
  var Interview = useSelector((state) => state.interviews[id]);
  const Participants = useSelector((state) =>
    Object.values(state.participants)
  );
  const [selParticipants, setSelParticipants] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParticipants());
    dispatch(getInterview(id));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    Interview.participant_ids = selParticipants;
    dispatch(editInterviewAction(id, Interview));
    location.href = "/";
  }

  return (
    <div className="container mt-5">
      {Interview && Participants ? (
        <>
          <h1>Edit Interview</h1>
          <form id="form_Interview">
            <div className="form-group">
              <label htmlFor="round">Round:</label>
              <input
                type="text"
                className="form-control"
                id="round"
                defaultValue={Interview.round}
                onChange={(e) => (Interview[round] = e.targetvalue)}
              />
            </div>

            <div className="form-group">
              <label>Participants:</label>
              <br />
              <CheckboxGroup //from react-checkbox-group used to add array of participants_id when checked
                name="selParticipants"
                defaultValue={selParticipants}
                onChange={setSelParticipants}
              >
                {(Checkbox) => (
                  <>
                    {Participants.map((participant) => (
                      <label key={participant.id}>
                        <Checkbox value={participant.id} /> {participant.name}
                      </label>
                    ))}
                  </>
                )}
              </CheckboxGroup>
            </div>

            <div className="form-group">
              <label htmlFor="starts_at">Starts_at</label>
              <input
                type="datetime"
                className="form-control"
                id="starts_at"
                defaultValue={Interview.starts_at}
                onChange={(e) => (Interview[starts_at] = e.targetvalue)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ends_at">Ends_at</label>
              <input
                type="datetime"
                className="form-control"
                id="ends_at"
                defaultValue={Interview.ends_at}
                onChange={(e) => (Interview[ends_at] = e.targetvalue)}
              />
            </div>

            <div className="actions mt-4">
              <Link className="btn btn-primary mr-3" to={`/`}>
                Back
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
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default editInterview;
