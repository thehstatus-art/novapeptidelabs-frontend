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
    "client-id": "AXTCIGAexGgZoNGFRr5ZDjKYI4JXgCLOAymMcR81OBbs20OKUXL7ag5JhZ-Vq1timbE4z2rUHV92QI-M",
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