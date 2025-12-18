import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

interface LinksFooterState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: LinksFooterState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchLinksFooter = createAsyncThunk(
  "linksFooter/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/social-links");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch number banner"
      );
    }
  }
);

const linksFooterSlice = createSlice({
  name: "linksFooter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinksFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinksFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(fetchLinksFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default linksFooterSlice.reducer;
