import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from "./GlobalStyles"
import App from './App';
import { Auth0Provider} from "@auth0/auth0-react"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENTID}
    redirectUri={window.location.origin}
  >   
      <GlobalStyles />
      <App />
  </Auth0Provider>
);

