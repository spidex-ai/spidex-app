import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { authSlice } from './slices/authSlice';

// Redux State Sync configuration
const stateSyncConfig = {
  channel: 'spidex_sync_channel',
  predicate: (action: any) => {
    // Only sync auth-related actions across tabs
    return action.type.startsWith('auth/');
  },
  blacklist: [
    // Don't sync these actions to prevent infinite loops
    'persist/PERSIST',
    'persist/REHYDRATE',
    'persist/REGISTER',
  ],
};

// Redux Persist configuration
const persistConfig = {
  key: 'spidex_root',
  storage,
  whitelist: ['auth'], // Only persist auth slice
  version: 1,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          '@@INIT_STATE_SYNC@@',
        ],
      },
    }).concat(createStateSyncMiddleware(stateSyncConfig) as any),
  devTools: process.env.NODE_ENV !== 'production',
});

// Initialize cross-tab message listener
if (typeof window !== 'undefined') {
  initMessageListener(store);
}

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
