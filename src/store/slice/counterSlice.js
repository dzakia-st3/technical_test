import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    loading: false,
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Async action triggers
    incrementAsync: (state) => {
      state.loading = true;
    },
    incrementAsyncSuccess: (state) => {
      state.loading = false;
      state.value += 1;
    },
    incrementAsyncFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementAsync,
  incrementAsyncSuccess,
  incrementAsyncFailure,
} = counterSlice.actions;

export default counterSlice.reducer;

