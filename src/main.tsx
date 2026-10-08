import { hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

hydrateRoot(document.getElementById("root")!, <App />, {
  identifierPrefix: "food-lab-",
});
