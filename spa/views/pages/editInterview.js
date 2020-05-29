import Utils from "../../services/Utils.js";

let fetchInterview = async (id) => {
  const options = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `http://localhost:3000/interviews/` + id,
      options
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error fetching Interview", error);
  }
};

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

let updateInterview = async (id, interview) => {
  const options = {
    method: "PATCH",
    body: JSON.stringify(interview),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `http://localhost:3000/interviews/` + id,
      options
    );
  } catch (err) {
    console.log("Error", err);
  }
};

let editInterview = {
  render: async () => {
    let Interview = await fetchInterview(Utils.parseRequestURL().id);
    let allParticipants = await fetchParticipants();
    let view = /*html*/ `
      <h1>Edit Interview</h1>
      <form id="form_Interview">
        <div class="form-group">
          <label for="round">Round:</label>
          <input type="text" class="form-control" name="round" value="${
            Interview.round
          }" required>
        </div>

        <div class="form-group">
          <label for="Participants">Participants:</label><br>,
          ${allParticipants.map(
            (participant) => /*html*/ `
              <input type="checkbox" id=${participant.id} name="id"  value=${participant.id} >
              <label for=${participant.id}> ${participant.email}</label><br>
              `
          )}
        </div>


        <div class="form-group">
          <label for="starts_at">Starts at:</label>
          <input type="datetime" class="form-control" name="starts_at" value="${
            Interview.starts_at
          }" required>
        </div>
        <div class="form-group">
          <label for="ends_at">Ends at:</label>
          <input type="datetime" class="form-control" name="ends_at" value="${
            Interview.ends_at
          }" required>
        </div>
        <div class="form-group">
          <label for="resume">Resume:</label>
          <input type="file" name="resume">
        </div>
      
        <div class="actions">
          <a class= 'btn btn-primary' href="#/">Back</a>
          <button type="submit" class="btn btn-primary" id="submit">Submit</button>
        </div>
      </form>
      `;
    return view;
  },
  after_render: async () => {
    const form = document.getElementById("form_Interview");
    await document.getElementById("submit").addEventListener("click", () => {
      let data1 = {};
      let participants_ids = [];

      Object.keys(form.elements).forEach((key) => {
        let element = form.elements[key];
        if (element.type !== "submit") {
          if (element.name == "id") {
            if (element.checked == true) {
              participants_ids.push({ id: element.value });
            }
          } else {
            data1[element.name] = element.value;
          }
        }
        data1["participants"] = participants_ids;
      });
      let data = {
        interview: {
          round: data1["round"],
          starts_at: data1["starts_at"],
          ends_at: data1["ends_at"],
          resume_file_name: data1["resume"],
          participants: data1["participants"],
        },
      };

      console.log(JSON.stringify(data));
      updateInterview(Utils.parseRequestURL().id, data);
      location.hash = "/";
    });
  },
};

export default editInterview;
