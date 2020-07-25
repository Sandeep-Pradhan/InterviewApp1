import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInterviews } from "../redux/actions/interviewActions";

function interviews() {
  const interviews = useSelector((state) => Object.values(state.interviews));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterviews());
  }, []);

  return (
    <div className="container mt-5">
      <div className="page-header">
        <h1>Interviews</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Round</th>
            <th>Participants</th>
            <th>Starts at</th>
            <th>Ends at</th>
            <th>Resume</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {interviews ? (
            <>
              {interviews.map((interview) => (
                <tr key={interview.id}>
                  <td> {interview.round}</td>
                  <td>
                    {interview.participants.map((participant) => (
                      <p key={participant.id}>{participant.name} </p>
                    ))}
                  </td>
                  <td> {interview.starts_at}</td>
                  <td> {interview.ends_at}</td>
                  <td>
                    <Link to={`${interview.resume}`}>
                      {interview.resume_file_name}
                    </Link>
                  </td>

                  <td>
                    <Link to={`/reactInterviews/${interview.id}/show`}>
                      Show
                    </Link>
                  </td>
                  <td>
                    <Link to={`/reactInterviews/${interview.id}/edit`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p>Loading</p>
          )}
        </tbody>
      </table>
      <Link className="btn btn-primary" to={`/reactInterviews/new`}>
        New Interview
      </Link>
    </div>
  );
}

export default interviews;
