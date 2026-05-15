import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching users');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error creating user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, details }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${id}`, details);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error deleting user');
    }
  }
);

const initialState = {
  users: [],
  details: { name: '', age: '', email: '', id: null },
  editIndex: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    resetDetails: (state) => {
      state.details = { name: '', age: '', email: '', id: null };
      state.editIndex = null;
    },
    setEditIndex: (state, action) => {
      state.editIndex = action.payload;
    },
    updateDetailsField: (state, action) => {
      const { name, value } = action.payload;
      state.details[name] = value;
    },
  },
  extraReducers: (builder) => {
    // Fetch Users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create User
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.details = { name: '', age: '', email: '', id: null };
      state.editIndex = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      state.details = { name: '', age: '', email: '', id: null };
      state.editIndex = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((u) => u.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setDetails, resetDetails, setEditIndex, updateDetailsField } = userSlice.actions;
export default userSlice.reducer;
