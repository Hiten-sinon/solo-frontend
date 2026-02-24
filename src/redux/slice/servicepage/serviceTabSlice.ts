import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance"; 

// Define TypeScript interfaces
interface Item {
  id: number;
  feature_id: number;
  image: string | null;
  image_url: string | null;
  description_en?: string | null;
  description_ar?: string | null;
}

interface SubFeature {
  id: number;
  parent_id: number | null;
  name_en: string;
  name_ar: string;
  discription_en: string | null;
  discription_ar: string | null;
  images: string | null;
  images_url: string | null;
  items?: Item[];
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
  serviceTabloading: boolean;
  error: string | null;
}

// Initial state
const initialState: ServiceTabState = {
  services: [],
  serviceTabloading: false,
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
        state.serviceTabloading = true;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.serviceTabloading = false;
          state.services = action.payload;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.serviceTabloading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceTabSlice.reducer;
