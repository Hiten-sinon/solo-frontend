import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export const fetchFeatures = createAsyncThunk("features/fetch", async () => {
  const response = await axiosAPIInstace.get("/home-tab-menu");
  return response.data.data; 
});

interface FeatureItem {
  id: number;
  title_en: string;
  title_ar: string;
  sub_title_en: string;
  sub_title_ar: string;
  images_url: string;
}

interface FeatureState {
  data: FeatureItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FeatureState = {
  data: [],
  loading: false,
  error: null,
};

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch features";
      });
  },
});

export default featureSlice.reducer;
