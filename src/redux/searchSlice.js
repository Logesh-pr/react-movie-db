import { createSlice } from "@reduxjs/toolkit";

const movieSearch = createSlice({
  name: "titleSearch",
  initialState: {
    value: {
      title: "",
    },
  },
  reducers: {
    title: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { title } = movieSearch.actions;
export default movieSearch.reducer;
