import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export const fetchSlider = createAsyncThunk("slider/fetch", async () => {
  const response = await axiosAPIInstace.get("/slider");
  return response.data.data;
});

interface SliderItem {
  id: number;
  title_en: string;
  title_ar: string;
  sub_title_en: string;
  sub_title_ar: string;
  images_url: string;
  button_name_en: string;
  button_name_ar: string;
  button_link: string;
}

interface SliderState {
  data: SliderItem[];
  bannersliderloading: boolean;
  error: string | null;
}

const initialState: SliderState = {
  data: [],
  bannersliderloading: false,
  error: null,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlider.pending, (state) => {
        state.bannersliderloading = true;
        state.error = null;
      })
      .addCase(fetchSlider.fulfilled, (state, action) => {
        state.bannersliderloading = false;
        state.data = action.payload;
      })
      .addCase(fetchSlider.rejected, (state, action) => {
        state.bannersliderloading = false;
        state.error = action.error.message || "Failed to fetch slider";
      });
  },
});

export default sliderSlice.reducer;
