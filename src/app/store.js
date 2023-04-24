import { configureStore } from '@reduxjs/toolkit'
import {articleApi} from '../services/articles'

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware)
})