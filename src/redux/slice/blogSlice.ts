// src/features/blog/blogSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

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
  blogcardloading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  blogcardloading: false,
  error: null,
};

// Thunk to fetch blog posts
export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPIInstace.get("/blogarticles"); 
      return response.data.data as BlogPost[];
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
      .addCase(fetchBlogs.pending, (state) => {
        state.blogcardloading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogs.fulfilled,
        (state, action: PayloadAction<BlogPost[]>) => {
          state.blogcardloading = false;
          state.posts = action.payload;
        }
      )
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.blogcardloading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
