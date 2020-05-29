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
    console.log("Error fetching Participants", error);
  }
};

let updatePartcipant = async (id, participant) => {
  const options = {
    method: "PATCH",
    body: JSON.stringify(participant),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `http://localhost:3000/participants/` + id,
      options
    );
  } catch (err) {
    console.log("Error Updating Participant", err);
  }
};

let editParticipant = {
  render: async () => {
    let Participant = await fetchParticipant(Utils.parseRequestURL().id);
    let view = /*html*/ `
      <h1>Edit Participant</h1>
      <form>
        <div class="form-group">
          <label for="Name">Name</label>
          <input type="text" class="form-control" id="Name" value="${
            Participant.name
          }" required>
        </div>
        <div class="form-group">
          <label for="Email">Email</label>
          <input type="email" class="form-control" id="Email" value="${
            Participant.email
          }" required>
        </div>
        <div class="form-group">
          <label for="Role">Role</label>
          <select class="form-control" id="Role" required>
            <option selected="selected">${Participant.role}</option>
            <option>${
              Participant.role == "Interviewer" ? "Interviewee" : "Interviewer"
            }</option>
          </select>
        </div>
      
        <div class="actions">
          <a class= 'btn btn-primary' href="#/participants">Participants</a>
          <button type="submit" class="btn btn-primary" id="submit">Submit</button>
        </div>
      </form>
      `;
    return view;
  },
  after_render: async () => {
    await document.getElementById("submit").addEventListener("click", () => {
      let data = {
        participant: {
          name: document.getElementById("Name").value,
          email: document.getElementById("Email").value,
          role: document.getElementById("Role").value,
        },
      };
      updatePartcipant(Utils.parseRequestURL().id, data);
      location.hash = "/";
    });
  },
};

export default editParticipant;
