import { configureStore } from "@reduxjs/toolkit";
// import favoriteDevicesReducer from "./Favorites/favoritesReducer";
import categoriesReducer from "./categories/categoriesReducer";
import productsReducer from "./products/productsReducer";
import authReducer from "./auth/AuthReducer";
export const store = configureStore({
  reducer: {
    // favories: favoriteDevicesReducer,
    categories: categoriesReducer,
    products: productsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
