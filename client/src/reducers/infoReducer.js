import {
  GET_INFOS,
  ADD_INFO,
  INFOS_LOADING,
  CLEAR_MSG,
} from "../actions/types";

const initialState = {
  infos: [],
  msg: {},
  loading: false,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_INFOS:
      return {
        ...state,
        infos: action.payload,
        msg: action.payload.msg,
        loading: false,
      };
    case ADD_INFO:
      return {
        ...state,
        infos: [action.payload, ...state.infos],
        msg: action.payload.msg,
      };
    case INFOS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_MSG:
      return {
        ...state,
        msg: {},
      };
    default:
      return state;
  }
}
