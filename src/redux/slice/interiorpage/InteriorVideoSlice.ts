import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface VideoData {
  id: number;
  title?: string; // English title field from API
  title_ar?: string;
  image?: string; // filename or URL
  image_url?: string;
  slug?: string;
  description?: string | null;
  description_ar?: string | null;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface InteriorVideoState {
  data: VideoData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: InteriorVideoState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchInteriorVideos = createAsyncThunk(
  "interiorVideos/fetchInteriorVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/interiors");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch interior videos"
      );
    }
  }
);

const interiorVideoSlice = createSlice({
  name: "interiorVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteriorVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInteriorVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInteriorVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default interiorVideoSlice.reducer;
