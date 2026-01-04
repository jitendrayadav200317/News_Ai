import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from "../../utils/util.js";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
  news: [],
  totalPages: 0,
  totalCount: 0,
  totaleItem: 0,
};

export const setPreferences = createAsyncThunk(
  "/Preferences",
  async (data, { rejectWithValue }) => {
    const id = getCookies("id");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/preferences/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went worng");
    }
  }
);
export const fetchAllNews = createAsyncThunk(
  "/fetchanews",
  async ({ currentPage, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/news?page=${currentPage}&keyword=${search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addReadingHistory = createAsyncThunk(
  "/reading-history/add",
  async (data, { rejectWithValue }) => {
    const id = getCookies("id");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`,
        data,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to add reading history",
      });
    }
  }
);

export const getReadingHistory = createAsyncThunk(
  "/reading-history/get",
  async (_, { rejectWithValue }) => {
    const id = getCookies("id");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to fetch reading history",
      });
    }
  }
);
const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setPreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(setPreferences.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setPreferences.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.totaleItem = action.payload.data.length;
      })
      .addCase(fetchAllNews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default newsSlice.reducer;
