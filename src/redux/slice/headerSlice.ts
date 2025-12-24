import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

/* ======== Types ======== */
export interface HeaderData {
  id: number;
  logo: string;
  logo_url: string;
  buttont_name_en: string;
  buttont_name_ar: string;
  status: number;
}

interface HeaderState {
  data: HeaderData | null;
  loading: boolean;
  error: string | null;
}

/* ======== Initial State ======== */
const initialState: HeaderState = {
  data: null,
  loading: false,
  error: null,
};

/* ======== Thunk (API Call) ======== */
export const fetchHeader = createAsyncThunk(
  "header/fetchHeader",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/header");
      return response.data.data; // API structure
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch header"
      );
    }
  }
);

/* ======== Slice ======== */
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default headerSlice.reducer;
