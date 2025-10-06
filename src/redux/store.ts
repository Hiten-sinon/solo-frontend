import { configureStore } from "@reduxjs/toolkit";
import partnersReducer from "./slice/homepage/partnersSlice";
import teamsReducer from "./slice/homepage/teamsSlice";
import numbersReducer from "./slice/homepage/numbersSlice";
import sliderReducer from "./slice/homepage/sliderSlice";
import featuresReducer from "./slice/homepage/featureSlice";
import servicescardReducer from "./slice/servicepage/servicescardSlice";
import serviceTabReducer from "./slice/servicepage/serviceTabSlice";
import soloDifferentReducer from "./slice/servicepage/soloDifferentSlice";
import blogSlice from "./slice/servicepage/blogSlice ";
import contactBannerReducer from './slice/contactpage/contactBannerSlice';
import contactFormReducer from './slice/contactpage/contactFormSlice';
import aboutBannerReducer from './slice/aboutpage/aboutBannerSlice';
import clientSayReducer from './slice/clientsay/clientSaySlice';
export const store = configureStore({
  reducer: {
    partners: partnersReducer,
    teams: teamsReducer,
    numbers: numbersReducer,
    slider: sliderReducer,
    features: featuresReducer, 
    servicescard: servicescardReducer,
    serviceTab: serviceTabReducer,
    soloDifferent: soloDifferentReducer,
    blogSlice: blogSlice,
    contactBanner: contactBannerReducer,
    contactForm: contactFormReducer,
    aboutBanner: aboutBannerReducer,
    clientSay: clientSayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
