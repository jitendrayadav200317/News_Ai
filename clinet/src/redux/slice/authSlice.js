import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import { removeCookies, setCookies, getCookies } from "../../utils/util";

const initialState = {
  loading: false,
  authenticated: getCookies("isAuthenticated") || false,
  name: getCookies("name") || null,
  id: getCookies("id") || null,
  preferences: JSON.parse(localStorage.getItem('preferences')) || [],
};
// register user api
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// login user Api
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
      const verifyres = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        { withCredentials: true }
      );
      // return res.data;
      return { ...res.data, ...verifyres.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    singOut: function (state) {
      state.authenticated = false;
      state.id = null;
      state.name = null;
      removeCookies("isAuthenticated");
      removeCookies("name");
      removeCookies("id");
    },
  },
  extraReducers: (builder) => {
    builder
      // register case
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.message);
        toast.success(action.payload.message);
      })
      .addCase(registerUser.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
        state.loading = false;
      })
      // login case
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;
        state.preferences = action.payload.preferences;
        localStorage.setItem('preferences',JSON.stringify(action.payload.preferences))

        setCookies("isAuthenticated", action.payload.authenticated);
        setCookies("name", action.payload.name);
        setCookies("id", action.payload.id);

        console.log(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload.response.data.message)
      });
  },
});

export default authSlice.reducer;
export const { singOut } = authSlice.actions;
