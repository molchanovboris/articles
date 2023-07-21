import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { ARTICLE_SLICE_KEY, articleSlice } from './articleSlice';
import { combineReducers, StateFromReducersMapObject } from "redux";
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = {
    [ARTICLE_SLICE_KEY]: articleSlice.reducer,
}

const rootReducer = combineReducers(reducer);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


