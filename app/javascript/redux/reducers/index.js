import { combineReducers } from "redux";
import interviewReducer from "./interviewReducer";
import participantReducer from "./participantReducer";

export default combineReducers({
  interviews: interviewReducer,
  participants: participantReducer,
});
