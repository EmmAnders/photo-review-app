import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";
import { useAuthContext } from "../../contexts/AuthContext";

//Hooks imports
import { useCollection } from "../../hooks/useCollection";

//Component imports
import { Modal, CollectionForm, CollectionList } from "../../components/index";

//Styles
import "./Collections.scss";

const Collections = () => {
	const { user } = useAuthContext();
	const { openModal, setOpenModal } = useCollectionContext();

	const { documents } = useCollection("photoCollections", [
		"uid",
		"==",
		user.uid,
	]);

	return (
		<section className="collections">
			<div className="collections-create-btn">
				<button onClick={() => setOpenModal(true)}>
					Create new collection
				</button>
			</div>

			<div>
				{documents && <CollectionList photoCollections={documents} />}
			</div>

			{openModal && (
				<>
					<Modal
						title="Create Collection"
						body={<CollectionForm />}
						close={() => setOpenModal(false)}
					/>
				</>
			)}
		</section>
	);
};

export default Collections;
