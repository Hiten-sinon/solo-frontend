import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface ExteriorBannerData {
  id: number;
  title_en: string;
  title_ar: string;
  sub_title_en?: string | null;
  sub_title_ar?: string | null;
  button_name_en?: string | null;
  button_name_ar?: string | null;
  button_link?: string | null;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

interface ExteriorBannerState {
  data: ExteriorBannerData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExteriorBannerState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchExteriorBanner = createAsyncThunk(
  "exteriorBanner/fetchExteriorBanner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/manage-titles/exterior");
      return response.data.data as ExteriorBannerData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch exterior banner"
      );
    }
  }
);

const exteriorBannerSlice = createSlice({
  name: "exteriorBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExteriorBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExteriorBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExteriorBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default exteriorBannerSlice.reducer;
