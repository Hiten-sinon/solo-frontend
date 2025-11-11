import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface AboutItem {
  id: number;
  main_banner_title_en: string;
  main_banner_title_ar: string;
  banner_image: string;
  images_url: string;

  section2_main_title_en: string;
  section2_main_title_ar: string;

  section3_main_title_en: string;
  section3_main_title_ar: string;

  // Section 2 icons + titles + descriptions
  section2_icon1: string;
  section2_icon1_url: string;
  section2_title1_en: string;
  section2_description1_en: string;
  section2_title1_ar: string;
  section2_description1_ar: string;

  section2_icon2: string;
  section2_icon2_url: string;
  section2_title2_en: string;
  section2_description2_en: string;
  section2_title2_ar: string;
  section2_description2_ar: string;

  section2_icon3: string;
  section2_icon3_url: string;
  section2_title3_en: string;
  section2_description3_en: string;
  section2_title3_ar: string;
  section2_description3_ar: string;

  section2_icon4: string;
  section2_icon4_url: string;
  section2_title4_en: string;
  section2_description4_en: string;
  section2_title4_ar: string;
  section2_description4_ar: string;
}

interface AboutState {
  loading: boolean;
  data: AboutItem | null;
  error: string | null;
}

const initialState: AboutState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchAboutData = createAsyncThunk(
  "about/fetchAboutData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPIInstace.get("/aboutus");
      // API returns { success, data: [ {...} ], message }
      return res.data.data[0];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch about data");
    }
  }
);

const aboutBannerSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default aboutBannerSlice.reducer;
