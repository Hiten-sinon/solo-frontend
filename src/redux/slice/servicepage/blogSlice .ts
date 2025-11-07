// src/store/blogSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance";

export interface BlogPost {
  id: number;
  blog_title_en: string;
  blog_title_ar: string;
  description_en: string;
  description_ar: string;
  images_url: string;
  author_en: string;
  author_ar: string;
}

interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/blogarticles");
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogPosts.fulfilled,
        (state, action: PayloadAction<BlogPost[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
