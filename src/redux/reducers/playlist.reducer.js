import {
  PLAYLIST_VIDEO_FAIL,
  PLAYLIST_VIDEO_REQUEST,
  PLAYLIST_VIDEO_SUCCESS,
} from "../actionType";

export const playlistVideosReducer = (
  state = {
    loading: false,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case PLAYLIST_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PLAYLIST_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };

    case PLAYLIST_VIDEO_FAIL:
      return {
        ...state,
        videos: null,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
