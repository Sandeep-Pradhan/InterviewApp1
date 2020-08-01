let Navbar = {
  render: async () => {
    let view = /*html*/ `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/">InterviewApp1</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="#/participants/new">Add Participants</a></li>
          <li><a href="#/participants">View Participants</a></li>
        </ul>
      </div>
    </nav>
      `;
    return view;
  },
  after_render: async () => {},
};

export default Navbar;
