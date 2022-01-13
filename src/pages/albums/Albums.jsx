import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";
import { useAuthContext } from "../../contexts/AuthContext";

//Hooks imports
import { useCollection } from "../../hooks/useCollection";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

//Component imports
import { Modal, AlbumForm, AlbumList } from "../../components/index";

//Styles
import "./Albums.scss";

const Albums = () => {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const { updatedName, currentAlbumId } = useCollectionContext();
	const { documents } = useCollection("photoAlbums", ["uid", "==", user.uid]);
	/* const updateAlbum = useUpdateDocument(); */

	useEffect(() => {
		console.log(currentAlbumId);
	}, [currentAlbumId]);

	/* const handleEditName = (e) => {
		e.preventDefault();

		if (!updateAlbum.isLoading) {
			updateAlbum.updateDocument(updatedName, "photoAlbums", id);
			console.log("success");
		}
		console.log("fail");
	};
 */
	return (
		<section className="albums">
			<div>
				{/* {updateAlbum.isLoading && <p>loading</p>}
				{updateAlbum.error && <p>Error</p>} */}
				{documents && (
					<AlbumList
						route={"album"}
						photoAlbums={documents}
						/* 	handleEditName={handleEditName} */
					/>
				)}
			</div>
		</section>
	);
};

export default Albums;
