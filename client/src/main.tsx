import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import  { store,persistor } from './redux/store/index.ts';
import { Spinner } from "./components/ui/spinner.tsx";

const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClient}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
