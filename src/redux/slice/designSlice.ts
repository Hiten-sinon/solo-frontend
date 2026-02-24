import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitDesignInquiry = createAsyncThunk(
  "design/submit",
  async (formData: any) => {
    const response = await axios.post(
      "/api/design-inquiry",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

const designSlice = createSlice({
  name: "design",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitDesignInquiry.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default designSlice.reducer;