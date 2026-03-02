import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PayPalScriptProvider
  options={{
    "client-id": "YOUR_PAYPAL_CLIENT_ID_HERE",
    currency: "USD",
    components: "buttons,marks"
  }}
>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
);

reportWebVitals();