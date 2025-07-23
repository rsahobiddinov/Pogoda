import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Route.tsx";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes} />
);
