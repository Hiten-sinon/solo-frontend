import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export const fetchPartners = createAsyncThunk("partners/fetch", async () => {
  const response = await axiosAPIInstace.get("/partners");
  return response.data;
});

interface PartnerState {
  data: any[];
  partnersLoading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  data: [],
  partnersLoading: false,
  error: null,
};


const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.partnersLoading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.partnersLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.partnersLoading = false;
        state.error = action.error.message || "Failed to fetch partners";
      });
  },
});

export default partnersSlice.reducer;
