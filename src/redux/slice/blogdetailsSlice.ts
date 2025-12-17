import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

interface BlogDetail {
  id: number;
  blog_title_en: string;
  blog_title_ar: string;
  description_en: string;
  description_ar: string;
  author_en: string;
  author_ar: string;
  images_url: string;
  banner_image_url: string | null;
  banner_image2_url: string | null;
  banner_image3_url: string | null;
  banner_image4_url: string | null;
  banner_image5_url: string | null;
}

interface BlogState {
  blogdetail: BlogDetail | null;
  recentBlogs: BlogDetail[];
  blogdetailsloading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogdetail: null,
  recentBlogs: [],
  blogdetailsloading: false,
  error: null,
};

export const fetchBlogDetails = createAsyncThunk(
  "blogdetails/fetchBlogDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get(`/blogarticles/detail/${id}`);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const blogdetailsSlice = createSlice({
  name: "blogdetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogDetails.pending, (state) => {
        state.blogdetailsloading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogDetails.fulfilled,
        (
          state,
          action: PayloadAction<{
            blogdetail: BlogDetail[];
            recentBlogs: BlogDetail[];
          }>
        ) => {
          state.blogdetailsloading = false;
          state.blogdetail = action.payload.blogdetail[0];
          state.recentBlogs = action.payload.recentBlogs;
        }
      )
      .addCase(
        fetchBlogDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.blogdetailsloading = false;
          state.error = action.payload;
        }
      );
  },
});

export default blogdetailsSlice.reducer;
