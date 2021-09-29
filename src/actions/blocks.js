import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const getBlockStart = (node) => {
  return {
    type: types.GET_BLOCK_START,
    node,
  };
};

const getBlockSuccess = (node, res) => {
  return {
    type: types.GET_BLOCK_SUCCESS,
    node,
    res,
  };
};

const getBlockFailure = (node) => {
  return {
    type: types.GET_BLOCK_FAILURE,
    node,
  };
};

export function getBlock(node) {
  return async (dispatch) => {
    try {
      dispatch(getBlockStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      

      if (res.status >= 400) {
        dispatch(getBlockFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(getBlockSuccess(node, json.data));
    } catch (err) {
      console.log({err})
      dispatch(getBlockFailure(node));
    }
  };
}
