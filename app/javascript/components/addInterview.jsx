import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckboxGroup from "react-checkbox-group";
import { getParticipants } from "../redux/actions/participantActions";
import { addInterview as addInterviewAction } from "../redux/actions/interviewActions";

function addInterview() {
  const Participants = useSelector((state) =>
    Object.values(state.participants)
  );
  var interview = {
    round: "",
    starts_at: "",
    ends_at: "",
    participants: [],
  };
  const [selParticipants, setSelParticipants] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParticipants());
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addInterviewAction(interview));
    // location.href = "/";
  }

  return (
    <div className="container mt-5">
      <h1>Add Interview</h1>
      <form id="form_Interview">
        <div className="form-group">
          <label htmlFor="round">Round:</label>
          <input
            type="text"
            className="form-control"
            id="round"
            placeholder="Enter Round"
            onChange={(e) => (interview.round = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Participants:</label>
          <br />
          {Participants ? (
            <>
              <CheckboxGroup //from react-checkbox-group used to add array of participants_id when checked
                name="selParticipants"
                value={selParticipants}
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
            </>
          ) : (
            <p>Loading Participants</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="starts_at">Starts_at</label>
          <input
            type="datetime"
            className="form-control"
            id="starts_at"
            onChange={(e) => (interview.round = e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ends_at">Ends_at</label>
          <input
            type="datetime"
            className="form-control"
            id="ends_at"
            onChange={(e) => (interview.round = e.target.value)}
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
    </div>
  );
}

export default addInterview;
