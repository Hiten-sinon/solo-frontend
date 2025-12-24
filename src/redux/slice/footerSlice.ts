import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

/* ========== Types =========== */
export interface FooterData {
  id: number;
  logo: string;
  logo_url: string;
  heading_en: string;
  heading_ar: string;
  button_name_en: string;
  button_name_ar: string;
  phone: string;
  email: string;
  address_en: string;
  address_ar: string;
  copyright_text: string;
  status: number;
}

interface FooterState {
  data: FooterData | null;
  loading: boolean;
  error: string | null;
}

/* ========== Initial State =========== */
const initialState: FooterState = {
  data: null,
  loading: false,
  error: null,
};

/* ========== Thunks =========== */
export const fetchFooter = createAsyncThunk(
  "footer/fetchFooter",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/footer");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch footer"
      );
    }
  }
);

/* ========== Slice =========== */
const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default footerSlice.reducer;
