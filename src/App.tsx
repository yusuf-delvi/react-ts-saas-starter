import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './Routes';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/ui/Error';
import axios from 'axios';

const App: React.FC = () => {
  const baseUrl = process.env.VITE_API_BASE_URL as string;

  const errorHandler = async (error: Error) => {
    await axios.post(`${baseUrl}general/error`, {
      error: {
        message: error.message,
        stack: error.stack,
        user:
          store.getState().auth.user?._id +
          '-' +
          store.getState().auth.user?.email,
      },
    });
  };

  return (
    <Provider store={store}>
      <ErrorBoundary
        fallback={<Error />}
        onError={(error) => {
          errorHandler(error);
        }}
      >
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </Router>
        </PersistGate>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
