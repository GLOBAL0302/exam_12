import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store/app.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from './axiosApi.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './globalConstant.ts';

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </PersistGate>
    </GoogleOAuthProvider>
  </StrictMode>,
);
