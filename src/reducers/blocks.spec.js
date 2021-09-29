import * as ActionTypes from '../constants/actionTypes';
import reducer from './blocks';
import initialState from './initialState';


describe('Reducers::Blocks', () => {
  const getInitialState = () => {
    return initialState().blocks;
  };

  const nodeA = {
    url: 'http://localhost:3002',
    online: false,
    name: null
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle GET_BLOCK_START', () => {
    const appState = {
      list: [1, 2]
    };
    const action = { type: ActionTypes.GET_BLOCK_START, node: nodeA };
    const expected = {
      list: [],
      loading: true,
      error: false,
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCK_SUCCESS', () => {
    const appState = {
      list: [1, 2]
    };
    const action = { type: ActionTypes.GET_BLOCK_SUCCESS, node: nodeA, res: [1,2] };
    const expected = {
      list: [1,2],
      loading: false,
      error: false,
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCK_FAILURE', () => {
    const appState = {
      list: [1,2]
    };
    const action = { type: ActionTypes.GET_BLOCK_FAILURE, node: nodeA };
    const expected = {
      list: [],
      loading: false,
      error: true,
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
