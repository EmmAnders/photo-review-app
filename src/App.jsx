import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";

import "./assets/scss/index.scss";
import "./App.scss";

// Route imports
import {
	Albums,
	Album,
	ReviewAlbum,
	ReviewedAlbums,
	ReviewedAlbum,
	Signup,
	Login,
} from "./pages/index.js";
import {
	RequireAuth,
	TopNavigation,
	SideNavigation,
} from "./components/index.js";

function App() {
	const { user } = useAuthContext();

	return (
		<div
			style={{
				gridTemplateColumns: user ? "15% 85%" : "0% 100%",
			}}
			className="site-wrapper"
		>
			<header>
				<TopNavigation />
			</header>

			<nav
				style={{
					display: user ? "" : "none",
				}}
			>
				<SideNavigation />
			</nav>

			<main>
				<Routes>
					<Route
						path="/"
						element={
							<RequireAuth redirectTo="/login">
								<Albums />
							</RequireAuth>
						}
					/>
					<Route
						path="/albums"
						element={
							<RequireAuth redirectTo="/login">
								<Albums />
							</RequireAuth>
						}
					/>

					<Route
						path="album/:id"
						element={
							<RequireAuth redirectTo="/login">
								<Album />
							</RequireAuth>
						}
					/>

					<Route
						path="reviewed-albums"
						element={
							<RequireAuth redirectTo="/login">
								<ReviewedAlbums />
							</RequireAuth>
						}
					/>
					<Route
						path="reviewed-album/:id"
						element={
							<RequireAuth redirectTo="/login">
								<ReviewedAlbum />
							</RequireAuth>
						}
					/>

					<Route
						path="review-album/:documentId/:linkId"
						element={<ReviewAlbum />}
					/>
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
