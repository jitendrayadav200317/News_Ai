import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  opened: false,
  loading: false,
  summary: "",
  error: null,
};

export const generateSummary = createAsyncThunk(
  "/generateSummary",
  async (article, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/summarize`,
        {
          url: article.url,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setOpened: function (state, action) {
      state.opened = !state.opened;
    },
    open: function (state) {
      state.opened = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSummary.pending, (state) => {
        (state.opened = true), (state.loading = true);
      })
      .addCase(generateSummary.fulfilled, (state, action) => {
        state.summary = action.payload.summary;
        state.loading = false;
      })
      .addCase(generateSummary.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      });
  },
});

export default summarySlice.reducer;
export const { setOpened, open } = summarySlice.actions;
