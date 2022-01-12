import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.module.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BreweryProvider } from "store/BreweryContext";

ReactDOM.render(
    <React.StrictMode>
        <BreweryProvider>
            <Router>
                <App />
            </Router>
        </BreweryProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
