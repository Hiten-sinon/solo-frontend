import { configureStore } from "@reduxjs/toolkit";
import partnersReducer from "../redux/slice/partnersSlice";
import teamsReducer from "../redux/slice/teamsSlice";
import numbersReducer from "../redux/slice/numbersSlice";
import sliderReducer from "../redux/slice/sliderSlice";
import featuresReducer from "./slice/featureSlice";

export const store = configureStore({
  reducer: {
    partners: partnersReducer,
    teams: teamsReducer,
    numbers: numbersReducer,
    slider: sliderReducer,
    features: featuresReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
