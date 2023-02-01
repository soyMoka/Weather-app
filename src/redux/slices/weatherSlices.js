import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const weatherAppKey=process.env.REACT_APP_OPEN_WEATHER_KEY

//Action
export const fetchWeatherAction = createAsyncThunk(
    "weather/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            console.log('-------preCityData--------');
            console.log(payload);
            console.log('---------------');
            const cityData = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${payload}&limit=5&appid=${weatherAppKey}`
            )
            console.log('-------preData--------');
            console.log(cityData);
            console.log('---------------');
            console.log('-------Buscamos--------');
            console.log(cityData.data[0].lat);
            console.log('---------------')
            if (cityData) {

                const { data } = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}&appid=${weatherAppKey}` 
                );
                return data;
            }
            return undefined
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)





//Slices

const weatherSlice = createSlice({
    name: "weather",
    initialState: {},
    extraReducers: builder => {
        //pending
        builder.addCase(fetchWeatherAction.pending, (state, action)=>{
            state.loading=true;
        });
        //fulfilled
        builder.addCase(fetchWeatherAction.fulfilled, (state, action)=>{
            state.weather = action && action.payload;
            state.loading =false;
            state.error = undefined;
        });
        //rejected
        builder.addCase(fetchWeatherAction.rejected, (state, action)=>{
            state.loading =false;
            state.weather =undefined;
            state.error =action?.payload
        }); 
    },
})


export default weatherSlice.reducer