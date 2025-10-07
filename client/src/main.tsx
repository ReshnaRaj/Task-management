import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import  { store,persistor } from './redux/store/index.ts';
const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClient}>
      <Provider store={store}>
        <PersistGate  loading={
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Please wait...</p>
    </div>
  } persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
