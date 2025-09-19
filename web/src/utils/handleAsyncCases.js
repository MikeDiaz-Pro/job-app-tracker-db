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
    });
};