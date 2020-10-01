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

let showInterview = {
  render: async () => {
    let Interview = await fetchInterview(Utils.parseRequestURL().id);
    let view = /*html*/ `
      <div class="container">
        <div class="jumbotron">
          <h1> ${Interview.round} </h1>
          <h4> Start Time: ${Interview.starts_at} </h4>
          <h4> End Time: ${Interview.ends_at} </h4>
          <h4> Participants: </h4>
          <ul>
            ${Interview.participants.map(
              (participant) =>
                `<li>${participant.name}(${participant.email}) </li>`
            )}
          </ul>
      
          <div class="actions mt-4 ml-3">
            <a class= 'btn btn-primary' href="#/">Interviews</a>
            <a class= 'btn btn-primary' href="#/interviews/${
              Interview.id
            }/edit">Edit</a>
          </div>
        </div>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default showInterview;
