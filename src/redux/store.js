import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import {
  homeVideoReducer,
  searchedVideosReducer,
} from "./reducers/videos.reducer";
import { selectedVideoReducer } from "./reducers/videos.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comments.reducer";
import { playlistVideosReducer } from "./reducers/playlist.reducer";
import { subscriptionsChannelReducer } from "./reducers/videos.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideoReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  playlistVideos: playlistVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  searchVideos: searchedVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
