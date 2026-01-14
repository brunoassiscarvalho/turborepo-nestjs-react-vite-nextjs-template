import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

if (!domain || !clientId) {
  console.error("Auth0 configuration missing. Please check your .env file.");
  console.error("Required environment variables:");
  console.error("- VITE_AUTH0_DOMAIN");
  console.error("- VITE_AUTH0_CLIENT_ID");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain || ""}
      clientId={clientId || ""}
      authorizationParams={{
        redirect_uri: `${globalThis.location.origin}/`,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
