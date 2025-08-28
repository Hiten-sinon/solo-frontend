import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../utils/axiosInstance";

export const fetchTeams = createAsyncThunk("teams/fetch", async () => {
  const response = await axiosAPIInstace.get("/teams");
  return response.data.data; 
});

interface Team {
  id: number;
  name_en: string;
  name_ar: string;
  job_title_en: string;
  job_title_ar: string;
  images_url: string;
}

interface TeamsState {
  data: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  data: [],
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch teams";
      });
  },
});

export default teamsSlice.reducer;
