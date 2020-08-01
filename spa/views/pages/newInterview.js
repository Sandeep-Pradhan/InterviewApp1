let newInterview = {
  render: async () => {
    let view = /*html*/ `
      <div class="container">
        <p> From new
      Interview.js</p>
      </div>
      `;
    return view;
  },
  after_render: async () => {},
};

export default newInterview;
