import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching products');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error creating product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, details }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/products/${id}`, details);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id , { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error deleting product');
    }
  }
);

const initialState = {
  products: [],
  details: { name: '', price: '', description: '', id: null },
  editIndex: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    resetDetails: (state) => {
      state.details = { name: '', age: '', description: '', id: null };
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
    // Fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    // Create Product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.details = { name: '', price: '', description: '', id: null };
      state.editIndex = null;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    // Update Product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex((u) => u.id === action.payload.id);
      if (index!== -1) {
        state.products[index] = action.payload;
      }
      state.details = { name: '', price:'', description:'', id: null };
      state.editIndex = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    

    // Delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter((u) => u.id !== action.payload);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },

});


export const { setDetails, resetDetails, setEditIndex, updateDetailsField } = productSlice.actions;
export default productSlice.reducer;
