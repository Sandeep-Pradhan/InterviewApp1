import interviews from "../apis/interviews";
import {
  GET_INTERVIEW,
  GET_INTERVIEWS,
  EDIT_INTERVIEW,
  ADD_INTERVIEW,
} from "./types";

export const getInterviews = () => async (dispatch) => {
  const response = await interviews.get("/interviews");
  // console.log(response);

  dispatch({
    type: GET_INTERVIEWS,
    payload: response.data,
  });
};

export const getInterview = (id) => async (dispatch) => {
  const response = await interviews.get(`/interviews/${id}`);

  dispatch({
    type: GET_INTERVIEW,
    payload: response.data,
  });
};

export const editInterview = (id, formValues) => async (dispatch) => {
  const response = await interviews.patch(`/interviews/${id}`, formValues);

  dispatch({
    type: EDIT_INTERVIEW,
    payload: response.data,
  });
};

export const addInterview = (formValues) => async (dispatch) => {
  const response = await interviews.post("/interviews", {
    ...formValues,
  });

  dispatch({
    type: ADD_INTERVIEW,
    payload: response.data,
  });
};
