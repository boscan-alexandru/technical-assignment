import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import authReducer from "./slices/authSlice";
import globalSettingsReducer from "./slices/globalSettingsSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
    globalSettings: globalSettingsReducer,
  },
});

export default store;
