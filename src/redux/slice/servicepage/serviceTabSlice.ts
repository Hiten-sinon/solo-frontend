import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance"; 

// Define TypeScript interfaces
interface SubFeature {
  id: number;
  parent_id: number | null;
  name_en: string;
  name_ar: string;
  discription_en: string;
  discription_ar: string;
  images: string;
  images_url: string;
}

export interface Service {
  id: number;
  parent_id: number | null;
  name_en: string;
  name_ar: string;
  discription_en: string;
  discription_ar: string;
  images: string;
  images_url: string;
  sub_features: SubFeature[];
}

interface ServiceTabState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ServiceTabState = {
  services: [],
  loading: false,
  error: null,
};

// Async thunk to fetch services using axios instance
export const fetchServices = createAsyncThunk(
  "serviceTab/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/features"); 
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const serviceTabSlice = createSlice({
  name: "serviceTab",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.loading = false;
          state.services = action.payload;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceTabSlice.reducer;
