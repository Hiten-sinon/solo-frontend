import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

interface ContactFormPayload {
  name: string;
  phone_number: string;
  email_address: string;
  message: string;
}

interface ContactFormState {
  contactformloading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactFormState = {
  contactformloading: false,
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
      state.contactformloading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.contactformloading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.contactformloading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.contactformloading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFormState } = contactFormSlice.actions;
export default contactFormSlice.reducer;
