import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CheckboxGroup from "react-checkbox-group";

function addInterview() {
  const [round, setRound] = useState("");
  const [starts_at, setStarts_at] = useState();
  const [ends_at, setEnds_at] = useState();
  const [participants, setParticipants] = useState([]);
  const [selParticipants, setSelParticipants] = useState([]);

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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selParticipants);
    console.log(participants);
    const interview = {
      round,
      starts_at,
      ends_at,
      participant_ids: selParticipants,
    };
    axios
      .post("/interviews", { interview })
      .then((res) => {
        alert("Interview Added");
        location.href = "/";
      })
      .catch((error) => {
        console.log("Error Adding Interview", error);
      });
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
            onChange={(e) => setRound(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Participants:</label>
          <br />
          <CheckboxGroup //from react-checkbox-group used to add array of participants_id when checked
            name="selParticipants"
            value={selParticipants}
            onChange={setSelParticipants}
          >
            {(Checkbox) => (
              <>
                {participants.map((participant) => (
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
            onChange={(e) => setStarts_at(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ends_at">Ends_at</label>
          <input
            type="datetime"
            className="form-control"
            id="ends_at"
            onChange={(e) => setEnds_at(e.target.value)}
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
