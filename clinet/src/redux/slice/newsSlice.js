import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from "../../utils/util.js";
import axios from "axios";

const initialState = {
  loading: false,
};
const id = getCookies('id');
export const setPreferences = createAsyncThunk(
  "/Preferences",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/preferences/${id}`,data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setPreferences.pending, (state) => {
        loading: true;
      })
      .addCase(setPreferences.fulfilled, (state) => {
        loading: false;
      })
      .addCase(setPreferences.rejected, (state) => {
        loading: false;
      });
  },
});

export default newsSlice.reducer;
