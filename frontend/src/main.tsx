import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import OrganizationsPage from "./Org.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrganizationsPage />
  </StrictMode>
);
