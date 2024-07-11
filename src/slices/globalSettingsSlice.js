import { createSlice } from "@reduxjs/toolkit";

export const globalSettingsSlice = createSlice({
  name: "globalSettings",
  initialState: { theme: "dark" },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "" : "dark";
    },
  },
});

export const selectTheme = (state) => state.globalSettings.theme;

export const { toggleTheme } = globalSettingsSlice.actions;
export default globalSettingsSlice.reducer;
