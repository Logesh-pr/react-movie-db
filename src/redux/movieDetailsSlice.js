import { createSlice } from "@reduxjs/toolkit";

const movieDetails = createSlice({
  name: "movieDetailsList",
  initialState: {
    value: {
      id: 0,
      backdrop: "",
      title: "",
      overview: "",
      poster: "",
      date: "",
      vote: 0,
      media_type: "",
      language: "",
      adult: true,
    },
  },
  reducers: {
    list: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { list } = movieDetails.actions;
export default movieDetails.reducer;
