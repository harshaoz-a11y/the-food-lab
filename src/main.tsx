import { hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { trackCallsToAction } from "./lib/analytics";

hydrateRoot(document.getElementById("root")!, <App />, {
  identifierPrefix: "food-lab-",
});

trackCallsToAction();
