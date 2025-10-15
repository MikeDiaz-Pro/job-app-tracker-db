import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';
import { showToast } from '../../../app/ui/uiSlice';

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


// POST
export const createApplication = createAsyncThunk(
  "applications/createApplication",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/applications", data);
      dispatch(showToast({ type: "success", message: "Application created!" }));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PUT
export const updateApplication = createAsyncThunk(
  "applications/updateApplication",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/applications/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE
export const deleteApplication = createAsyncThunk(
  "applications/deleteApplication",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/applications/${id}`);
      toast.success("✅ Application deleted successfully");
      return id;
    } catch (err) {
      toast.error(`❌ Failed to delete: ${err.response?.data?.message || err.message}`);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);