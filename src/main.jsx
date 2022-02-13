import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import AuthContextProvider from "./contexts/AuthContext";
import CollectionContextProvider from "./contexts/CollectionContext";
import App from "./App";

import "./App.scss";

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
