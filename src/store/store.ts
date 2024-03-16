import { configureStore } from "@reduxjs/toolkit";
import { entityApi } from "../services/services";
import { setupListeners } from "@reduxjs/toolkit/query";
import entityReducer from "../features/entitySlice";

export const store = configureStore({
  reducer: {
    entities: entityReducer,
    [entityApi.reducerPath]: entityApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(entityApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
