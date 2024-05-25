import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_SUCCESS,
  SELECTED_VIDEO_REQUEST,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAIL,
} from "../actionType";

export const homeVideoReducer = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };

    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      };

    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const subscriptionsChannelReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case SUBSCRIPTIONS_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SUBSCRIPTIONS_CHANNEL_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };

    case SUBSCRIPTIONS_CHANNEL_FAIL:
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

export const searchedVideosReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case SEARCH_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };

    case SEARCH_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
