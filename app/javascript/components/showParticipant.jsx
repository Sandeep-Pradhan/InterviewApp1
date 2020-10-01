import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getParticipant } from "../redux/actions/participantActions";

function showParticipant() {
  const { id } = useParams();
  const participant = useSelector((state) => state.participants[id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipant(id));
  }, []);

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        {participant ? (
          <>
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
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}

export default showParticipant;
