import Utils from "../../services/Utils.js";

let fetchParticipant = async (id) => {
  const options = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `http://localhost:3000/participants/` + id,
      options
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error fetching Participant", error);
  }
};

let showParticipant = {
  render: async () => {
    let Participant = await fetchParticipant(Utils.parseRequestURL().id);
    let view = /*html*/ `
      <div class="container">
        <div class="jumbotron">
          <h1>  ${Participant.name} </h1>
          <p> Email: ${Participant.email} </p>
          <p> Role: ${Participant.role} </p>
      
          <div class="actions mt-4 ml-3">
            <a class= 'btn btn-primary' href="#/participants">Participants</a>
            <a class= 'btn btn-primary' href="#/participants/${Participant.id}/edit">Edit</a>
          </div>
        </div>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default showParticipant;
