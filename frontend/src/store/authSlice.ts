import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('sahara_token'),
  isAuthenticated: false,
  loading: false,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    const response = await fetch('http://localhost:8000/api/v1/auth/anonymous', {
      method: 'POST',
    });
    const data = await response.json();
    return data.access_token;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('sahara_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('sahara_token', action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;