import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CheckboxGroup from "react-checkbox-group";

function editInterview() {
  const { id } = useParams();

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

    axios
      .get(`/interviews/${id}`)
      .then((res) => {
        setRound(res.data.round);
        setStarts_at(res.data.starts_at);
        setEnds_at(res.data.ends_at);
        setSelParticipants(res.data.participants.map((p) => p.id));
        // console.log(res.data.participants.map((p) => p.id));
      })
      .catch((error) => {
        console.log("Error fetching Interview", error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const interview = {
      round,
      starts_at,
      ends_at,
      participant_ids: selParticipants,
    };
    axios
      .patch(`/interviews/${id}`, interview)
      .then((res) => {
        alert("Interview Updated");
        location.href = "/";
      })
      .catch((error) => {
        console.log("Error Updating Interview", error);
      });
  }

  return (
    <div className="container mt-5">
      <h1>Edit Interview</h1>
      <form id="form_Interview">
        <div className="form-group">
          <label htmlFor="round">Round:</label>
          <input
            type="text"
            className="form-control"
            id="round"
            value={round}
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
            value={starts_at}
            onChange={(e) => setStarts_at(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ends_at">Ends_at</label>
          <input
            type="datetime"
            className="form-control"
            id="ends_at"
            value={ends_at}
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

export default editInterview;
