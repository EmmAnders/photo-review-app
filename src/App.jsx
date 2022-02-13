import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import { useCollectionContext } from "./contexts/CollectionContext";

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
	Header,
	SideNav,
	Modal,
	CreateAlbumForm,
} from "./components/index.js";

function App() {
	const { user } = useAuthContext();
	const { openCreateAlbum, setOpenCreateAlbum } = useCollectionContext();

	return (
		<div id="app" className="relative h-full py-16">
			<div className="px-4 xl:px-0 container h-full">
				<header className="flex justify-between items-center pb-24">
					<Header />
				</header>

				<div className="md:grid md:grid-cols-12 gap-x-16 lg:gap-x-24 h-full ">
					<nav
						className={
							user ? "md:col-start-1 md:col-end-4" : "hidden"
						}
					>
						<SideNav />
					</nav>

					<main
						className={
							user
								? "col-start-4 col-end-13"
								: "col-start-1 col-end-13"
						}
					>
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
			</div>
			{openCreateAlbum && (
				<Modal
					title="Create Album"
					body={<CreateAlbumForm />}
					close={() => setOpenCreateAlbum(false)}
				/>
			)}
		</div>
	);
}

export default App;
