import {toast} from "react-toastify"

// Small utility to reduce boilerplate in extraReducers
export const handleAsyncCases = (builder, asyncThunk, handlers = {}) => {
  const { onPending, onFulfilled, onRejected } = handlers;

  builder
    .addCase(asyncThunk.pending, (state) => {
      state.status = 'loading';
      if (onPending) onPending(state);
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (onFulfilled) onFulfilled(state, action);
    })    
    .addCase(asyncThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      if (onRejected) onRejected(state, action);
    })       
};

export const notifySuccess = (message) => {
  toast.success(message)
}

export const notifyWarning = (message) => {
  toast.warning(message)
}

export const notifyError = (message) => {
  toast.error(message)
}

export const notifyInfo = (message) => {
  toast.info(message)
}