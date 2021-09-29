import {
  GET_BLOCK_START,
  GET_BLOCK_SUCCESS,
  GET_BLOCK_FAILURE,
} from "../constants/actionTypes";
import initialState from "./initialState";

export default function blocksReducer(state = initialState().blocks, action) {
  switch (action.type) {
    case GET_BLOCK_START:
      return {
        list: [],
        loading: true,
        error: false,
      };
    case GET_BLOCK_SUCCESS:
      return {
        list: action.res,
        loading: false,
        error: false,
      };
    case GET_BLOCK_FAILURE:
      return {
        list: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
