import { combineReducers } from "@reduxjs/toolkit";
import gameSlice from "./game";

export default combineReducers({
  game: gameSlice.reducer,
});
