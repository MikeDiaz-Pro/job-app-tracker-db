import { createSlice } from '@reduxjs/toolkit';
import { fetchApplications } from './applicationsActions';
import { handleAsyncCases } from '../../../utils/handleAsyncCases';

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch applications
    handleAsyncCases(builder, fetchApplications, {
      onFulfilled: (state, action) => {
        state.items = action.payload;
      },
    });   
  },
});

export default applicationsSlice.reducer;