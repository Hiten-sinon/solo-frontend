import { configureStore } from "@reduxjs/toolkit";
import partnersReducer from "./slice/homepage/partnersSlice";
import teamsReducer from "./slice/homepage/teamsSlice";
import numbersReducer from "./slice/homepage/numbersSlice";
import sliderReducer from "./slice/homepage/sliderSlice";
import featuresReducer from "./slice/homepage/featureSlice";
import servicescardReducer from "./slice/servicepage/servicescardSlice";
import serviceTabReducer from "./slice/servicepage/serviceTabSlice";
import soloDifferentReducer from "./slice/servicepage/soloDifferentSlice";
import blogSlice from "./slice/blogSlice";
import contactBannerReducer from "./slice/contactpage/contactBannerSlice";
import contactFormReducer from "./slice/contactpage/contactFormSlice";
import aboutBannerReducer from "./slice/aboutpage/aboutBannerSlice";
import clientSayReducer from "./slice/clientsay/clientSaySlice";
import blogdetailsReducer from "./slice/blogdetailsSlice";
import inquiryReducer from "./slice/inquirySlice";
import exteriorReducer from "./slice/exteriorSlice";
import numberBannerReducer from "./slice/homepage/numberBannerSlice";
import linksFooterReducer from "./slice/homepage/linksFooterSlice";
import manageTitleReducer from "./slice/homepage/manageTitleSlice";
import headerReducer from "./slice/headerSlice";
import footerReducer from "./slice/footerSlice";
import interiorBannerReducer from "./slice/interiorpage/interiorBanner.slice";
import interiorVideoReducer from "./slice/interiorpage/InteriorVideoSlice";
import exteriorBannerReducer from "./slice/exteriorpage/ExteriorBannerSlice";
import exteriorVideoReducer from "./slice/exteriorpage/ExteriorVideoSlice";

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
    blogdetails: blogdetailsReducer,
    inquiry: inquiryReducer,
    exterior: exteriorReducer,
    numberBanner: numberBannerReducer,
    linksFooter: linksFooterReducer,
    manageTitle: manageTitleReducer,
    header: headerReducer,
    footer: footerReducer,
    interiorBanner: interiorBannerReducer,
    interiorVideos: interiorVideoReducer,
    exteriorBanner: exteriorBannerReducer,
    exteriorVideos: exteriorVideoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
