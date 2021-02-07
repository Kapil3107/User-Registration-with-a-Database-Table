import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  errorMsg: [],
  status: null,
  id: null,
};

export default function loo(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        errorMsg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        errorMsg: [],
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
