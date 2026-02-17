import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

/* ========== Types =========== */
export interface InteriorBannerData {
  id: number;
  title_en: string;
  title_ar: string;
  sub_title_en: string;
  sub_title_ar: string;
  button_name_en: string;
  button_name_ar: string;
  button_link: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface InteriorBannerSliceState {
  data: InteriorBannerData | null;
  loading: boolean;
  error: string | null;
}

/* ========== Initial State =========== */
const initialState: InteriorBannerSliceState = {
  data: null,
  loading: false,
  error: null,
};

/* ========== Thunks =========== */
export const fetchInteriorBanner = createAsyncThunk(
  "interiorBanner/fetchInteriorBanner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/manage-titles/interior");
      return response.data.data as InteriorBannerData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch interior banner"
      );
    }
  }
);

/* ========== Slice =========== */
const interiorBannerSlice = createSlice({
  name: "interiorBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteriorBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInteriorBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInteriorBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default interiorBannerSlice.reducer;
