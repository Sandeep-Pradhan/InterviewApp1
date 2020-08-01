let Interview = {
  render: async () => {
    let view = /*html*/ `
      <div class="container">
        <p> From Interview.js</p>
        <a href="#/interviews/1/edit">Edit Interview1</a> <br/>
        <a href="#/interviews/1/show">Show Interview1</a> <br/><br/>
        <a href="#/interviews/new">New Interview</a>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default Interview;
