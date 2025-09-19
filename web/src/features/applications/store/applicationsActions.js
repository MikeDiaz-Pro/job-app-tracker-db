import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';

// Thunks (requests API)
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/applications');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);