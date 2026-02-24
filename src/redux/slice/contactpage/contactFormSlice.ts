import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export type InquiryType = "contact" | "career";

export interface InquiryPayload {
  name: string;
  phone_number: string;
  email_address: string;
  message: string;
  type: InquiryType;
  cv?: File | null;
}

interface InquiryState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: InquiryState = {
  loading: false,
  success: false,
  error: null,
};

export const submitInquiryForm = createAsyncThunk<
  any,
  InquiryPayload | FormData,
  { rejectValue: string }
>("inquiry/submit", async (payload, { rejectWithValue }) => {
  try {
    const url = "/contactusforminquiry";

    const isFormData = payload instanceof FormData;

    const response = await axiosAPIInstace.post(url, payload, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Something went wrong"
    );
  }
});

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    resetInquiryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInquiryForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitInquiryForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitInquiryForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Submission failed";
      });
  },
});

export const { resetInquiryState } = inquirySlice.actions;
export default inquirySlice.reducer;
