import {
  PLAYLIST_VIDEO_FAIL,
  PLAYLIST_VIDEO_REQUEST,
  PLAYLIST_VIDEO_SUCCESS,
} from "../actionType";
import request from "../../api";

export const getPlaylistVideos = (id) => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken;
    dispatch({
      type: PLAYLIST_VIDEO_REQUEST,
    });
    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: id,
        maxResults: 15,
      },
      headers: {
        Authorization: ` ${accessToken}`,
        Accept: "application/json",
      },
    });

    dispatch({
      type: PLAYLIST_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: PLAYLIST_VIDEO_FAIL,
      payload: error.message,
    });
  }
};
