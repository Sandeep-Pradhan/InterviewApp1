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

let createInterview = async (interview) => {
  const options = {
    method: "POST",
    body: JSON.stringify(interview),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`http://localhost:3000/interviews`, options);
  } catch (err) {
    console.log("Error", err);
  }
};

let newInterview = {
  render: async () => {
    let allParticipants = await fetchParticipants();
    let view = /*html*/ `
      <h1>New Interview</h1>
      <form id="form_Interview">
        <div class="form-group">
          <label for="round">Round:</label>
          <input type="text" class="form-control" name="round" placeholder="Enter Round name" required>
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
          <input type="datetime" class="form-control" name="starts_at" placeholder="Enter Start Time" required>
        </div>
        <div class="form-group">
          <label for="ends_at">Ends at:</label>
          <input type="datetime" class="form-control" name="ends_at" placeholder="Enter End Time" required>
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
            //for participants
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
          resume: data1["resume"],
          participants: data1["participants"],
        },
      };

      console.log(JSON.stringify(data));
      createInterview(data);
      location.hash = "/";
    });
  },
};

export default newInterview;
