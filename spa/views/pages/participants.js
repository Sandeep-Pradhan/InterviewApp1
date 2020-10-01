let fetchParticipants = async () => {
  const options = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`http://localhost:3000/participants`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error fetching Participants", error);
  }
};

let Participants = {
  render: async () => {
    let allParticipants = await fetchParticipants();
    let view = /*html*/ `
      <div class="container mt-5">
        <div class="page-header">
          <h1>Participants</h1>
        </div>
      </div>
      
      <div class="container mt-4">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            ${allParticipants.map(
              (participant) => /*html*/ `
              <tr> 
                <td> ${participant.name}</td> 
                <td> ${participant.email}</td>
                <td> ${participant.role}</td>
                <td><a href="#/participants/${participant.id}/show">Show</a></td>
                <td><a href="#/participants/${participant.id}/edit">Edit</a></td>
              </tr>
              `
            )}
          </tbody>
        </table>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default Participants;
