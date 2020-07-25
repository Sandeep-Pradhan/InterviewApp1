import participants from "../apis/participants";
import {
  GET_PARTICIPANT,
  GET_PARTICIPANTS,
  EDIT_PARTICIPANT,
  ADD_PARTICIPANT,
} from "./types";

export const getParticipants = () => async (dispatch) => {
  const response = await participants.get("/participants");
  // console.log(response);

  dispatch({
    type: GET_PARTICIPANTS,
    payload: response.data,
  });
};

export const getParticipant = (id) => async (dispatch) => {
  const response = await participants.get(`/participants/${id}`);

  dispatch({
    type: GET_PARTICIPANT,
    payload: response.data,
  });
};

export const editParticipant = (id, formValues) => async (dispatch) => {
  const response = await participants.patch(
    `/participants/${id}.json`,
    formValues
  );

  dispatch({
    type: EDIT_PARTICIPANT,
    payload: response.data,
  });
};

export const addParticipant = (formValues) => async (dispatch) => {
  const response = await participants.post("/participants", {
    ...formValues,
  });

  dispatch({
    type: ADD_PARTICIPANT,
    payload: response.data,
  });
};
