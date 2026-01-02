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

const id = getCookies("id");
export const setPreferences = createAsyncThunk(
  "/Preferences",
  async (data, { rejectWithValue }) => {
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/news`
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went worng");
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
        console.log(action.payload);
        
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
