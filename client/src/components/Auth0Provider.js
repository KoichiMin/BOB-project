import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
// this is being called in the index.js 
const Auth0ProviderWithHistory = ({ children }) => {
    
    const domain = process.env.REACT_APP_DOMAIN;
    const clientId = process.env.REACT_APP_CLIENT_ID;

    const history = useNavigate();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        >
        {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;