// src/redux/slices/clientSaySlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { axiosAPIInstace } from "../../../utils/axiosInstance"; 

export interface ClientSay {
    id: number;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    status: string;
    images_url: string | null;
    created_at: string;
    updated_at: string;
}

interface ClientSayState {
    data: ClientSay[];
    loading: boolean;
    error: string | null;
}

// Async thunk to fetch client testimonials
export const fetchClientSay = createAsyncThunk<ClientSay[]>(
    "clientSay/fetchClientSay",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosAPIInstace.get("/whatclientsaysaboutus"); // your API endpoint
            return response.data.data; // the array from API
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState: ClientSayState = {
    data: [],
    loading: false,
    error: null,
};

const clientSaySlice = createSlice({
    name: "clientSay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientSay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientSay.fulfilled, (state, action: PayloadAction<ClientSay[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchClientSay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default clientSaySlice.reducer;
