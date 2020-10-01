let createPartcipant = async (participant) => {
  const options = {
    method: "POST",
    body: JSON.stringify(participant),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`http://localhost:3000/participants`, options);
  } catch (err) {
    console.log("Error", err);
  }
};

let addParticipant = {
  render: async () => {
    let view = /*html*/ `
      <h1>Add Participant</h1>
      <form>
        <div class="form-group">
          <label for="Name">Name</label>
          <input type="text" class="form-control" id="Name" placeholder="Enter name">
        </div>
        <div class="form-group">
          <label for="Email">Email</label>
          <input type="email" class="form-control" id="Email" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="Role">Role</label>
          <select class="form-control" id="Role">
            <option>Interviewer</option>
            <option>Interviewee</option>
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
      createPartcipant(data);
      location.hash = "/";
    });
  },
};

export default addParticipant;
