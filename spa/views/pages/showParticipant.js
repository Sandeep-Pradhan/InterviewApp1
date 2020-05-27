let showParticipant = {
  render: async () => {
    let view = /*html*/ `
      <div class="container">
        <p> From show
      Participant.js</p>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default showParticipant;
