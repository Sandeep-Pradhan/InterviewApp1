let fetchInterviews = async () => {
  const options = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`http://localhost:3000`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error fetching Interviews", error);
  }
};

let Interviews = {
  render: async () => {
    let allinterviews = await fetchInterviews();
    let view = /*html*/ `
      <div class="container mt-5">
        <div class="page-header">
          <h1>Interviews</h1>
        </div>
      </div>
      
      <div class="container mt-4">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Round</th>
              <th>Participants</th>
              <th>Starts at</th>
              <th>Ends at</th>
              <th>Resume</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            ${allinterviews.map(
              (interview) => /*html*/ `
              <tr> 
                <td> ${interview.round}</td> 
                <td> ${interview.participants.map(
                  (participant) => `${participant.name}`
                )}</td>
                <td> ${interview.starts_at}</td>
                <td> ${interview.ends_at}</td>
                <td> <a href = "${interview.resume}" target="_blank"> ${
                interview.resume_file_name
              } </a></td>

                <td><a href="#/interviews/${interview.id}/show">Show</a></td>
                <td><a href="#/interviews/${interview.id}/edit">Edit</a></td>
              </tr>
              `
            )}
          </tbody>
        </table>
        <a href="#/interviews/new" class="btn btn-primary">New Interview</a>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default Interviews;
