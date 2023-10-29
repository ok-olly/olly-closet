import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login, logout, signup } from "../services/apiAuth";

const initialState = {
  isLoading: false,
  userInfo: null,
  error: null,
};

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async ({ fullName, email, password }) => {
    const data = await signup({ fullName, email, password });
    return data;
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { user, session } = await login({ email, password });
    return user;
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const user = await getCurrentUser();
    return user;
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  await logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("signup rejected!", action.error);
      });
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("login rejected!", action.error);
      });
    builder
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("getCurrentUser rejected!", action.error);
      });
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = null;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
        console.log("logout rejected!");
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
