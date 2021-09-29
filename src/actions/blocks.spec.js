import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./blocks";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions (Block)", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  const blocks =  [{
        "id": "5",
        "type": "blocks",
        "attributes": {
          "index": 1,
          "timestamp": 1530679678,
          "data": "The Human Torch",
          "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
          "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
        }
      }];

  it("should fetch the block list", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ data: blocks });
        },
      })
    );
    await ActionCreators.getBlock(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_BLOCK_START,
        node,
      },
      {
        type: ActionTypes.GET_BLOCK_SUCCESS,
        node,
        res: blocks,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to get the block list", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.getBlock(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_BLOCK_START,
        node,
      },
      {
        type: ActionTypes.GET_BLOCK_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
