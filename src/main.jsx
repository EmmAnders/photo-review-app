import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import AuthContextProvider from "./contexts/AuthContext";
import CollectionContextProvider from "./contexts/CollectionContext";
import "./index.css";
import App from "./App";

render(
	<BrowserRouter>
		<AuthContextProvider>
			<CollectionContextProvider>
				<SimpleReactLightbox>
					<App />
				</SimpleReactLightbox>
			</CollectionContextProvider>
		</AuthContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
