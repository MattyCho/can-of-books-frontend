import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="mc-tenant-domain.us.auth0.com"
    clientId="8zHnNy437wKInxJnBjnvU5SHmL9WUsIi"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
