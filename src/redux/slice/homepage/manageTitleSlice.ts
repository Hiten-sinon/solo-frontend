import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface ManageTitle {
  id: number;
  title_en: string;
  title_ar: string;
  sub_title_en: string;
  sub_title_ar: string;
  button_name_en: string | null;
  button_name_ar: string | null;
  button_link: string | null;
  slug: string;
}

interface ManageTitleState {
  data: Record<string, ManageTitle>;
  loading: boolean;
  error: string | null;
}

const initialState: ManageTitleState = {
  data: {},
  loading: false,
  error: null,
};

export const fetchManageTitleBySlug = createAsyncThunk<
  ManageTitle,
  string,
  { rejectValue: string }
>("manageTitle/fetchBySlug", async (slug, { rejectWithValue }) => {
  try {
    const res = await axiosAPIInstace.get(`/manage-titles/${slug}`);
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to fetch title"
    );
  }
});

const manageTitleSlice = createSlice({
  name: "manageTitle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManageTitleBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManageTitleBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.slug] = action.payload;
      })
      .addCase(fetchManageTitleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default manageTitleSlice.reducer;
