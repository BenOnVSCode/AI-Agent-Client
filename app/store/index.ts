import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth";
import { callsApi } from "./services/calls";
import { statusesApi } from "./services/statuses";
import { usersApi } from "./services/users";


export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware).concat(callsApi.middleware).concat(statusesApi.middleware).concat(usersApi.middleware),
});

setupListeners(store.dispatch);