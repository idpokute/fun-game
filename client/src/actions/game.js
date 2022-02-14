import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initGame = createAsyncThunk("game/init", async (id, thunkAPI) => {
  let response;
  if (!id) {
    response = await axios.get("http://localhost:9876/init");
  } else {
    response = await axios.get("http://localhost:9876/init/user/" + id);
  }

  return response.data;
});
