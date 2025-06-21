'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './index';

interface ReduxProviderProps {
  children: React.ReactNode;
}

// Loading component for PersistGate
const PersistGateLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  );
};

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistGateLoading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
