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
  readingHistory: [],
  bookmarks: [],
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
  "readingHistory/add",
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
  "/readingHistory/get",
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
export const getBookmarks = createAsyncThunk(
  "/getBookmarks",
  async (_, { rejectWithValue }) => {
    const id = getCookies("id");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
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

export const addBookmarks = createAsyncThunk(
  "/addBookmarks", //bookmarks
  async (data, { rejectWithValue }) => {
    const id = getCookies("id");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeBookmarks = createAsyncThunk(
  "/removeBookmarks",
  async (articleUrl, { rejectWithValue }) => {
    const id = getCookies("id");
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
        { data: { articleUrl } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      .addCase(setPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload.preferences;
      })
      .addCase(setPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(addReadingHistory.pending, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addReadingHistory.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getReadingHistory.pending, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getReadingHistory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.readingHistory = action.payload.data;
      })
      .addCase(getReadingHistory.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addBookmarks.pending, (action, state) => {
        state.loading = true;
        console.log(action.payload);
      })
      .addCase(addBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(addBookmarks.rejected, (state, action) => {
        state.loading = true;
        console.log(action.payload);
      })
      .addCase(removeBookmarks.pending, (action, state) => {
        state.loading = true;
        console.log(action.payload);
      })
      .addCase(removeBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(removeBookmarks.rejected, (state, action) => {
        state.loading = true;
        console.log(action.payload);
      })
      .addCase(getBookmarks.pending, (state, action) => {
        state.loading = true;
        console.log(action.payload);
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.bookmarks = action.payload.data;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.loading = true;
        console.log(action.payload);
      });
  },
});

export default newsSlice.reducer;

// export const removeBookmarks = createAsyncThunk(
//   "bookmarks/removeBookmarks",
//   async (articleUrl, { rejectWithValue }) => {
//     const id = getCookies("id");
//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,
//         {
//           data: { articleUrl }
//         }
//       );
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );
