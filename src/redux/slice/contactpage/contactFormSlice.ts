import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

interface ContactFormPayload {
  name: string;
  phone_number: string;
  email_address: string;
  message: string;
}

interface ContactFormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactFormState = {
  loading: false,
  success: false,
  error: null,
};

// Async thunk
export const submitContactForm = createAsyncThunk<
  any, 
  ContactFormPayload
>("contactForm/submit", async (formData, { rejectWithValue }) => {
  try {
    const res = await axiosAPIInstace.post("/contactusforminquiry", formData);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Something went wrong");
  }
});

const contactFormSlice = createSlice({
  name: "contactForm",
  initialState,
  reducers: {
    resetFormState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFormState } = contactFormSlice.actions;
export default contactFormSlice.reducer;
