// src/store/contactBannerSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface ContactBannerData {
  id: number;
  title1_en: string;
  title1_ar: string;
  baner_image: string;
  title2_en: string;
  title2_ar: string;
  button1_lable_en: string;
  button1_lable_ar: string;
  button1_link: string;
  button2_lable_en: string;
  button2_lable_ar: string;
  button2_link: string;
  button3_lable_en: string;
  button3_lable_ar: string;
  button3_link: string;
  subtitle_en: string;
  subtitle_ar: string;
  contact_form_title_en: string;
  contact_form_title_ar: string;
  images_url: string;
}

interface ContactBannerState {
  data: ContactBannerData | null;
  contactbannerloading: boolean;
  error: string | null;
}

const initialState: ContactBannerState = {
  data: null,
  contactbannerloading: false,
  error: null,
};

export const fetchContactBannerData = createAsyncThunk(
  "contactBanner/fetchContactBannerData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/contactusdata");
      return response.data.data[0];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const contactBannerSlice = createSlice({
  name: "contactBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactBannerData.pending, (state) => {
        state.contactbannerloading = true;
        state.error = null;
      })
      .addCase(
        fetchContactBannerData.fulfilled,
        (state, action: PayloadAction<ContactBannerData>) => {
          state.contactbannerloading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchContactBannerData.rejected, (state, action) => {
        state.contactbannerloading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactBannerSlice.reducer;
