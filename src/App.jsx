import { Routes, Route } from "react-router-dom";
import "./assets/scss/index.scss";
import "./App.scss";

// Route imports
import { Collections, Collection, Signup, Login } from "./pages/index.js";
import {
	RequireAuth,
	TopNavigation,
	SideNavigation,
} from "./components/index.js";

function App() {
	return (
		<div className="site-wrapper">
			<header>
				<TopNavigation />
			</header>

			<nav>
				<SideNavigation />
			</nav>
			<main>
				<Routes>
					<Route
						path="/"
						element={
							<RequireAuth redirectTo="/login">
								<Collections />
							</RequireAuth>
						}
					/>
					<Route
						path="/collection/:id"
						element={
							<RequireAuth redirectTo="/login">
								<Collection />
							</RequireAuth>
						}
					/>

					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
