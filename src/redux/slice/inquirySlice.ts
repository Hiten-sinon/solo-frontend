import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

// 🧩 Async thunk to submit construction inquiry form
export const submitInquiry = createAsyncThunk(
  "inquiry/submitConstruction",
  async (formData: InquiryFormData, { rejectWithValue }) => {
    try {
      const payload = new FormData();
      payload.append("type", "internal");
      payload.append("name", formData.name);
      payload.append("phone_number", formData.phone_number);
      payload.append("place_of_residence", formData.place_of_residence);
      payload.append("project_location", formData.project_location);
      payload.append("project_area", formData.project_area);
      payload.append("type_of_space", formData.type_of_space);
      payload.append(
        "sketch_available",
        String(formData.sketch_available || false)
      );
      if (formData.image) {
        payload.append("image", formData.image);
      }
      const response = await axiosAPIInstace.post(
        "/construction-client-info",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit inquiry"
      );
    }
  }
);

// 🧩 Async thunk to submit design inquiry form
export const submitDesignInquiry = createAsyncThunk(
  "inquiry/submitDesign",
  async (formData: DesignInquiryFormData, { rejectWithValue }) => {
    try {
      const payload = {
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        city: formData.city,
        project_location: formData.project_location,
        project_type: formData.project_type,
        area: formData.area,
        preferred_colors: formData.preferred_colors,
        architectural_plan: formData.architectural_plan ? 1 : 0,
        number_of_users: formData.number_of_users,
        age_range: formData.age_range,
        special_notes: formData.special_notes,
        other_notes: formData.other_notes,
        design_style: formData.design_style,
        selected_examples: formData.selected_examples,
      };
      const response = await axiosAPIInstace.post("/design-inquiry", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit design inquiry"
      );
    }
  }
);

// 🧩 Async thunk to submit finishing work inquiry form
export const submitFinishingInquiry = createAsyncThunk(
  "inquiry/submitFinishing",
  async (formData: FinishingInquiryFormData, { rejectWithValue }) => {
    try {
      const payload = {
        type: "internal",
        name: formData.name,
        phone_number: formData.phone_number,
        place_of_residence: formData.place_of_residence,
        project_location: formData.project_location,
        site_area: formData.site_area,
        vehicle_type: formData.vehicle_type,
      };
      const response = await axiosAPIInstace.post("/finishing-works", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit finishing inquiry"
      );
    }
  }
);

// 🧩 NEW: Async thunk to submit Solo Learn form
export const submitSoloLearnInquiry = createAsyncThunk(
  "inquiry/submitSoloLearn",
  async (formData: SoloLearnFormData, { rejectWithValue }) => {
    try {
      const payload = {
        type: "internal",
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth,
        place_of_residence: formData.place_of_residence,
        college_major: formData.college_major,
        status: formData.status,
        year_of_graduation: formData.year_of_graduation,
        worked_in_finishing_field: formData.worked_in_finishing_field,
      };
      const response = await axiosAPIInstace.post(
        "/sole-learn/store",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit Solo Learn inquiry"
      );
    }
  }
);

// 🧾 Types
interface InquiryFormData {
  type: string;
  name: string;
  phone_number: string;
  place_of_residence: string;
  project_location: string;
  project_area: string;
  type_of_space: string;
  sketch_available?: boolean;
  image?: File | null;
}

export interface DesignInquiryFormData {
  full_name: string;
  phone_number: string;
  city: string;
  project_location: string;
  project_type: string;
  area: string;
  preferred_colors: string;
  architectural_plan: boolean;
  number_of_users: string;
  age_range: string;
  special_notes: string;
  other_notes: string;
  design_style: string;
  selected_examples: string[];
}

// ✅ Type for Finishing Inquiry
export interface FinishingInquiryFormData {
  type: string;
  name: string;
  phone_number: string;
  place_of_residence: string;
  project_location: string;
  site_area: string;
  vehicle_type: string;
}

// ✅ Type for Solo Learn Inquiry
export interface SoloLearnFormData {
  type: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  place_of_residence: string;
  college_major: string;
  status: string;
  year_of_graduation: string;
  worked_in_finishing_field: boolean;
}

interface InquiryResponse {
  message: string;
  data: any;
}

interface InquiryState {
  data: InquiryResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: InquiryState = {
  data: null,
  loading: false,
  error: null,
};

// 🧱 Slice
const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Construction Work
      .addCase(submitInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to submit inquiry";
      })
      // Design Work
      .addCase(submitDesignInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDesignInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(submitDesignInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to submit design inquiry";
      })
      // Finishing Work
      .addCase(submitFinishingInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFinishingInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(submitFinishingInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to submit finishing inquiry";
      })
      // ✅ Solo Learn
      .addCase(submitSoloLearnInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSoloLearnInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(submitSoloLearnInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to submit Solo Learn inquiry";
      });
  },
});

export default inquirySlice.reducer;
