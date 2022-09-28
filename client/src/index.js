import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from "./GlobalStyles"
import App from './App';
import { Auth0Provider} from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // this Provider will enable the Auth0 login. 
  <Auth0Provider
        domain="dev-jhze9czt.us.auth0.com"
        clientId="fSC4UwM5Ex24d6vtJltlIGZOY7AOT45M"
        redirectUri={window.location.origin}
      >   
  
      <GlobalStyles />
      <App />

    </Auth0Provider>
);

