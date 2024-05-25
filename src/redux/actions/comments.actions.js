import request from "../../api";

import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
} from "../actionType";

export const getCommentsById = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;

    dispatch({
      type: COMMENT_LIST_REQUEST,
    });
    const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
        maxResults: 14,
      },
      headers: {
        Authorization: ` ${accessToken}`,
        Accept: "application/json",
      },
    });
    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.message,
    });
  }
};
