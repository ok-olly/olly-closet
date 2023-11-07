import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  login,
  logout,
  signup,
  addToCart,
  updateCurrentUser,
  removeCartItem,
  resetCart,
} from "../services/apiAuth";

const initialState = {
  isLoading: false,
  userInfo: null,
  error: null,
  isLoggedin: false,
  cart: [],
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

export const updateCurrentUserAsync = createAsyncThunk(
  "auth/updateCurrentUser",
  async ({ password, fullName, address, phoneNumber }) => {
    const data = await updateCurrentUser({
      password,
      fullName,
      address,
      phoneNumber,
    });
    return data;
  }
);

export const addToCartAsync = createAsyncThunk(
  "auth/addToCart",
  async (product) => {
    const data = await addToCart(product);
    return data;
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "auth/removeCartItem",
  async (id) => {
    const data = await removeCartItem(id);
    return data;
  }
);

export const resetCartAsync = createAsyncThunk("auth/resetCart", async () => {
  const data = await resetCart();
  return data;
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
        state.cart = action.payload ? action.payload.user_metadata.cart : [];
        state.isLoggedin = true;
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
        state.isLoggedin = false;
        state.error = null;
        state.cart = [];
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
        console.log("logout rejected!");
      });
    builder
      .addCase(updateCurrentUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCurrentUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateCurrentUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("updateCurrentUser rejected!");
      });
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.cart = action.payload.user_metadata.cart;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("addToCart rejected!");
      });
    builder
      .addCase(removeCartItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.cart = action.payload.user_metadata.cart;
      })
      .addCase(removeCartItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("removeCartItem rejected!");
      });
    builder
      .addCase(resetCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.cart = action.payload.user_metadata.cart;
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log("resetCart rejected!");
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
