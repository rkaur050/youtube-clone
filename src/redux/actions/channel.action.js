import request from "../../api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
} from "../actionType";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });
    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: id,
      },
    });

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
