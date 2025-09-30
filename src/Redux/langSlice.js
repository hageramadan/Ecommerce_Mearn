import { createSlice } from "@reduxjs/toolkit";
import English from "../i18n/EN";
import Arabic from "../i18n/AR"; // استوردي ملف اللغة العربي

const initialState = {
  lang: "en",
  content: English,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      // غير المحتوى حسب اللغة المختارة
      if (action.payload === "en") {
        state.content = English;
      } else if (action.payload === "ar") {
        state.content = Arabic;
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
