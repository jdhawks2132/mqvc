import { configureStore } from '@reduxjs/toolkit';
import { mqvcAPI } from './mqvcAPI';

export const store = configureStore({
	reducer: {
		[mqvcAPI.reducerPath]: mqvcAPI.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mqvcAPI.middleware),
});
