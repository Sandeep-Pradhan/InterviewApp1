import {
  GET_INTERVIEW,
  GET_INTERVIEWS,
  EDIT_INTERVIEW,
  ADD_INTERVIEW,
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_INTERVIEW:
      return { ...state, [action.payload.id]: action.payload };
    case GET_INTERVIEWS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case EDIT_INTERVIEW:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_INTERVIEW:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
