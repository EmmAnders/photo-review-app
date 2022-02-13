import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../contexts/CollectionContext";
import { useAuthContext } from "../contexts/AuthContext";

//Hooks imports
import { useCollection } from "../hooks/useCollection";

//Component imports
import { AlbumList } from "../components/index";

const Albums = () => {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const {} = useCollectionContext();
	const { documents } = useCollection("photoAlbums", ["uid", "==", user.uid]);

	return (
		<section className="albums">
			<div>
				{documents && (
					<AlbumList
						route={"album"}
						photoAlbums={documents}
						collection="photoAlbums"
					/>
				)}
			</div>
		</section>
	);
};

export default Albums;
