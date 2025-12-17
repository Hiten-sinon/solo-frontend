import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

interface NumberBannerState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: NumberBannerState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchNumberBanner = createAsyncThunk(
  "numberBanner/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/number-banner");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch number banner"
      );
    }
  }
);

const numberBannerSlice = createSlice({
  name: "numberBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNumberBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNumberBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(fetchNumberBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default numberBannerSlice.reducer;
