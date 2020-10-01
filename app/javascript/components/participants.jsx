import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getParticipants } from "../redux/actions/participantActions";

function participants() {
  const participants = useSelector((state) =>
    Object.values(state.participants)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParticipants());
  }, []);

  return (
    <div className="container mt-5">
      {participants ? (
        <>
          <div className="page-header">
            <h1>Participants</h1>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td> {participant.name}</td>
                  <td> {participant.email}</td>
                  <td> {participant.role}</td>
                  <td>
                    <Link to={`/reactParticipants/${participant.id}/show`}>
                      Show
                    </Link>
                  </td>
                  <td>
                    <Link to={`/reactParticipants/${participant.id}/edit`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default participants;
