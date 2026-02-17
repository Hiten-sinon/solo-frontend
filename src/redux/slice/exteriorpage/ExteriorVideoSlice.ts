import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface ExteriorVideoData {
  id: number;
  title?: string;
  title_ar?: string;
  image?: string;
  image_url?: string;
  slug?: string;
  description?: string | null;
  description_ar?: string | null;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface ExteriorVideoState {
  data: ExteriorVideoData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExteriorVideoState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchExteriorVideos = createAsyncThunk(
  "exteriorVideos/fetchExteriorVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/exteriors");
      return response.data.data as ExteriorVideoData[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch exterior videos"
      );
    }
  }
);

const exteriorVideoSlice = createSlice({
  name: "exteriorVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExteriorVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExteriorVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExteriorVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default exteriorVideoSlice.reducer;
