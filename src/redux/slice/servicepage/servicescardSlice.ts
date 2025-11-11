import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

// thunk for fetching services
export const fetchServices = createAsyncThunk("services/fetchServices", async () => {
  const response = await axiosAPIInstace.get("/services");
  return response.data.data; // API returns { success, data, message }
});

const servicescardSlice = createSlice({
  name: "services",
  initialState: {
    items: [] as any[],
    servicecardloading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.servicecardloading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.servicecardloading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.servicecardloading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default servicescardSlice.reducer;
