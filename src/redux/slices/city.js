import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const weatherAppKey=process.env.REACT_APP_OPEN_WEATHER_KEY


//Action


export const cityToCord = createAsyncThunk(
    "city/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${payload.city}&limit=5&appid=${weatherAppKey}

                ` 
            );
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)


const citiSlice = createSlice({
    name:'city',
    initialState:{},
    extraReducers: builder => {
        //Pending
        builder.addCase(cityToCord.pending, (state, action)=>{
            state.loading=true;
        });
        //fullfilled
        builder.addCase(cityToCord.fulfilled, (state, action)=>{
            state.city = action && action.payload;
            state.loading =false;
            state.error = undefined;
        });
        //rejected
        builder.addCase(cityToCord.rejected, (state, action)=>{
            state.loading =false;
            state.city =undefined;
            state.error =action?.payload
        }); 
    }
})


export default citiSlice.reducer;