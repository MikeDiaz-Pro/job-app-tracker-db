import { createSlice } from '@reduxjs/toolkit';
import { fetchApplications } from './applicationsActions';
import { handleAsyncCases } from '../../../utils/handleAsyncCases';

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    form: {
      mode: "create", 
      values: {
        id: null,
        jobPostingId: "",
        statusCode: "",
        source: "",
        salaryMin: "",
        salaryMax: "",
        notes: "",
      },
    },
  },
  reducers: {    
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form.values[field] = value;
    },
    resetForm: (state) => {
      state.form = {
        mode: "create",
        values: {
          id: null,
          jobPostingId: "",
          statusCode: "",
          source: "",
          salaryMin: "",
          salaryMax: "",
          notes: "",
        },
      };
    },
    loadFormForEdit: (state, action) => {
      state.form = {
        mode: "edit",
        values: action.payload, 
      };
    },
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