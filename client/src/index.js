import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from "./GlobalStyles"
import App from './App';
import { Auth0Provider} from "@auth0/auth0-react"
import dotenv from 'dotenv';
dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID;

root.render(
  // this Provider will enable the Auth0 login. 
  <React.StrictMode>
    <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
        >   
          <GlobalStyles />
          <App />
      </Auth0Provider>
    </React.StrictMode>
);

