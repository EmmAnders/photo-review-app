import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";
import { useAuthContext } from "../../contexts/AuthContext";

//Hooks imports
import { useCollection } from "../../hooks/useCollection";

//Component imports
import { Modal, AlbumForm, AlbumList } from "../../components/index";

//Styles
import "./Albums.scss";

const Albums = () => {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const { openModal, setOpenModal } = useCollectionContext();
	const { documents } = useCollection("photoAlbums", ["uid", "==", user.uid]);

	return (
		<section className="collections">
			{/* 	<div className="collections-create-btn">
				<button onClick={() => setOpenModal(true)}>
					Create new Album
				</button>
			</div> */}

			<div>
				{documents && (
					<AlbumList route={"album"} photoAlbums={documents} />
				)}
			</div>

			{/* 	{openModal && (
				<>
					<Modal
						title="Create Album"
						body={<AlbumForm />}
						close={() => setOpenModal(false)}
					/>
				</>
			)} */}
		</section>
	);
};

export default Albums;
