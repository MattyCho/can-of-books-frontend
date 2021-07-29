import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Auth0Provider} from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider domain="dev-3zy4mv8n.us.auth0.com" clientId="rJEBl55FkKaA1rHQwCBuWTLl2xGekl77" redirectUri="http://localhost:3000/">
    <App />
  </Auth0Provider>, document.getElementById('root')
  );
