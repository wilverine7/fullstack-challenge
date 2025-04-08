import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import OrganizationsPage from "./Org.tsx";
import DealsPage from "./Deals.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DealsPage />
  </StrictMode>
);
