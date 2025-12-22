import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export const fetchNumbers = createAsyncThunk("numbers/fetch", async () => {
  const response = await axiosAPIInstace.get("/numbers");
  return response.data;
});


interface NumbersState {
  data: any[];
  numbersLoading: boolean;
  error: string | null;
  
}

const initialState: NumbersState = {
  data: [],
  numbersLoading: false,
  error: null,
};

const numbersSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNumbers.pending, (state) => {
        state.numbersLoading = true;
        state.error = null;
      })
      .addCase(fetchNumbers.fulfilled, (state, action) => {
        state.numbersLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchNumbers.rejected, (state, action) => {
        state.numbersLoading = false;
        state.error = action.error.message || "Failed to fetch numbers";
      });
  },
});

export default numbersSlice.reducer;
