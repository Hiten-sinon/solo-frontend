// src/store/soloDifferentSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface SoloDifferentItem {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  images: string;
  images_url: string;
  type: "main_service" | "sub_service";
}

interface SoloDifferentState {
  data: SoloDifferentItem[];
  solodifferentloading: boolean;
  error: string | null;
}

const initialState: SoloDifferentState = {
  data: [],
  solodifferentloading: false,
  error: null,
};

export const fetchSoloDifferent = createAsyncThunk(
  "soloDifferent/fetchSoloDifferent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/solodifference");
      return response.data.data as SoloDifferentItem[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const soloDifferentSlice = createSlice({
  name: "soloDifferent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSoloDifferent.pending, (state) => {
        state.solodifferentloading = true;
        state.error = null;
      })
      .addCase(
        fetchSoloDifferent.fulfilled,
        (state, action: PayloadAction<SoloDifferentItem[]>) => {
          state.solodifferentloading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchSoloDifferent.rejected, (state, action) => {
        state.solodifferentloading = false;
        state.error = action.payload as string;
      });
  },
});

export default soloDifferentSlice.reducer;
