import { createSlice } from "@reduxjs/toolkit";

const genresDetail = createSlice({
  name: "genresId",
  initialState: {
    value: {
      newId: 0,
      newName: "",
    },
  },
  reducers: {
    id: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { id } = genresDetail.actions;
export default genresDetail.reducer;
