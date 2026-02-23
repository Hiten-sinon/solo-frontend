import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

// 🧩 Async thunk to submit construction inquiry form
export const submitInquiry = createAsyncThunk(
  "inquiry/submitConstruction",
  async (formData: InquiryFormData, { rejectWithValue }) => {
    try {
      const payload = new FormData();
      payload.append("type", "external");
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
      if (formData.image) payload.append("image", formData.image);
      if (formData.sketch_drawing_image) {
        payload.append("sketch_drawing_image", formData.sketch_drawing_image);
      }
      
      

      const response = await axiosAPIInstace.post(
        "/construction-client-info",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit inquiry"
      );
    }
  }
);

// 🧩 Async thunk to submit design inquiry form (Updated for “design-inquiry”)
// export const submitDesignInquiry = createAsyncThunk(
//   "inquiry/submitDesign",
//   async (formData: any, { rejectWithValue }) => {
//     try {
//       // ✅ Build payload exactly as required by your API
//       const payload = {
//         type: formData.type || "external",
//         full_name: formData.full_name,
//         phone_number: formData.phone_number,
//         place_of_residence: formData.place_of_residence,
//         project_location: formData.project_location,
//         project_area: String(formData.project_area || ""),
//         sketch_drawing: Boolean(formData.sketch_drawing),
//         sketch_drawing_image: formData.sketch_drawing_image,
//         desired_area_from: formData.desired_area_from,
//         desired_area_to: formData.desired_area_to,
//         number_of_floors: formData.number_of_floors,
//         separate_floor_reception_living: Boolean(
//           formData.separate_floor_reception_living
//         ),
//         combined_floor: Boolean(formData.combined_floor),
//         guest_bedroom_with_bathroom: Boolean(
//           formData.guest_bedroom_with_bathroom
//         ),
//         guest_bedroom_without_bathroom: Boolean(
//           formData.guest_bedroom_without_bathroom
//         ),
//         external_reception_restroom: Boolean(
//           formData.external_reception_restroom
//         ),
//         reception_dining_restroom: Boolean(formData.reception_dining_restroom),
//         men_reception_separate_restroom: Boolean(
//           formData.men_reception_separate_restroom
//         ),
//         women_reception_separate_restroom: Boolean(
//           formData.women_reception_separate_restroom
//         ),
//         living_room: Boolean(formData.living_room),
//         closed_kitchen: Boolean(formData.closed_kitchen),
//         open_kitchen: Boolean(formData.open_kitchen),
//         separate_hot_cold_kitchen: Boolean(formData.separate_hot_cold_kitchen),
//         dining_area: Boolean(formData.dining_area),
//         master_bedroom_with_bathroom: Boolean(
//           formData.master_bedroom_with_bathroom
//         ),
//         master_bedroom_with_dressing_bathroom: Boolean(
//           formData.master_bedroom_with_dressing_bathroom
//         ),
//         children_bedrooms: formData.children_bedrooms || "",
//         maids_room: Boolean(formData.maids_room),
//         drivers_room: Boolean(formData.drivers_room),
//         laundry_room: Boolean(formData.laundry_room),
//         storage_room: Boolean(formData.storage_room),
//         cinema_room: Boolean(formData.cinema_room),
//         recreation_gym_room: Boolean(formData.recreation_gym_room),
//         indoor_courtyard: Boolean(formData.indoor_courtyard),
//         swimming_pool: Boolean(formData.swimming_pool),
//         design_style: formData.design_style,
//         selected_examples: formData.selected_examples,
//         notes: formData.notes,
//       };

//       const response = await axiosAPIInstace.post("/design-inquiry", payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to submit design inquiry"
//       );
//     }
//   }
// );

export const submitDesignInquiry = createAsyncThunk(
  "inquiry/submitDesign",
  async (formData: any, { rejectWithValue }) => {
    try {
      const payload = new FormData();

      payload.append("type", formData.type || "external");
      payload.append("full_name", formData.full_name);
      payload.append("phone_number", formData.phone_number);
      payload.append("place_of_residence", formData.place_of_residence);
      payload.append("project_location", formData.project_location);
      payload.append("project_area", formData.project_area || "");

      payload.append(
        "sketch_drawing",
        formData.sketch_drawing ? "1" : "0"
      );

      // ✅ FILE FIX
      if (formData.sketch_drawing_image) {
        payload.append(
          "sketch_drawing_image",
          formData.sketch_drawing_image
        );
      }

      // other fields
      payload.append("design_style", formData.design_style || "");
      payload.append("notes", formData.notes || "");

      const response = await axiosAPIInstace.post(
        "/design-inquiry",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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
        type: "external",
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

// 🧩 Async thunk to submit Solo Learn form
export const submitSoloLearnInquiry = createAsyncThunk(
  "inquiry/submitSoloLearn",
  async (formData: SoloLearnFormData, { rejectWithValue }) => {
    try {
      const payload = {
        type: "external",
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
  sketch_drawing_image?: File | null;
  image?: File | null;
}

export interface DesignInquiryFormData {
  type: string;
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
const exteriorSlice = createSlice({
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

      // Solo Learn
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

export default exteriorSlice.reducer;
