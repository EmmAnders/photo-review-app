import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCollectionContext } from "../../contexts/CollectionContext";
import { v4 as uuidv4 } from "uuid";

//Firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CollectionForm = (props) => {
	const { user } = useAuthContext();
	const {
		selectedImages,
		setSelectedImages,
		setOpenModal,
	} = useCollectionContext();

	const navigate = useNavigate();
	const [newCollection, setNewCollection] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newCollection == "") {
			await addDoc(collection(db, "photoAlbums"), {
				name: newCollection,
				timestamp: serverTimestamp(),
				uid: user.uid,
				images: selectedImages,
				shareableLink: uuidv4() + "-" + uuidv4(),
			});
		}
		setSelectedImages([]);
		setOpenModal(false);
		navigate("/");
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<label>
				<span>Name</span>
				<input
					required
					placeholder="Album name"
					type="text"
					onChange={(e) => setNewCollection(e.target.value)}
					value={newCollection}
				/>
			</label>
			<button
				className={`${
					newCollection ? "primary-button" : "disabled-button"
				}`}
				onClick={props.close}
				type="submit"
			>
				Create
			</button>
		</form>
	);
};

export default CollectionForm;
