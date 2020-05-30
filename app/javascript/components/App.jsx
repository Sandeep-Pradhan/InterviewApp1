import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./header";
import Interviews from "./interviews";
import addInterview from "./addInterview";
import editInterview from "./editInterview";
import showInterview from "./showInterview";

import Participants from "./participants";
import addParticipant from "./addParticipant";
import editParticipant from "./editParticipant";
import showParticipant from "./showParticipant";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Interviews} />
            <Route path="/reactInterviews/new" exact component={addInterview} />
            <Route
              path="/reactInterviews/:id/edit"
              exact
              component={editInterview}
            />
            <Route
              path="/reactInterviews/:id/show"
              exact
              component={showInterview}
            />

            <Route path="/reactParticipants" exact component={Participants} />
            <Route
              path="/reactParticipants/new"
              exact
              component={addParticipant}
            />
            <Route
              path="/reactParticipants/:id/edit"
              exact
              component={editParticipant}
            />
            <Route
              path="/reactParticipants/:id/show"
              exact
              component={showParticipant}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
