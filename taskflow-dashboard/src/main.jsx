import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import App from "@/App";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provider poori app ko store se connect karta hai */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);