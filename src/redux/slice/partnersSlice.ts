import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

export const fetchPartners = createAsyncThunk("partners/fetch", async () => {
  const response = await axiosAPIInstace.get("/partners");
  return response.data;
});

interface PartnerState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  data: [],
  loading: false,
  error: null,
};

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch partners";
      });
  },
});

export default partnersSlice.reducer;
