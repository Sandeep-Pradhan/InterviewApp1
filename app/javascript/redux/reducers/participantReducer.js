import {
  GET_PARTICIPANT,
  GET_PARTICIPANTS,
  EDIT_PARTICIPANT,
  ADD_PARTICIPANT,
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PARTICIPANT:
      return { ...state, [action.payload.id]: action.payload };
    case GET_PARTICIPANTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case EDIT_PARTICIPANT:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_PARTICIPANT:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
