import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import "./index.css";
import App from "./App";

render(
	<BrowserRouter>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
