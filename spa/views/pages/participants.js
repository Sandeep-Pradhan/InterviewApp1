let Participants = {
  render: async () => {
    let view = /*html*/ `
      <div class="container">
        <p> From Participants.js</p>
        
        <a href="#/participants/1/edit">Edit Participants1</a> <br/>
        <a href="#/participants/1/show">Show Participants1</a> <br/><br/>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default Participants;
