import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

//Contexts
import { useAuthContext } from "../../contexts/AuthContext";
import { useCollectionContext } from "../../contexts/CollectionContext";

const CreateAlbumForm = (props) => {
	const { user } = useAuthContext();
	const {
		selectedImages,
		setSelectedImages,
		setOpenCreateAlbum,
	} = useCollectionContext();

	const navigate = useNavigate();
	const [newAlbum, setNewAlbum] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newAlbum == "") {
			await addDoc(collection(db, "photoAlbums"), {
				name: newAlbum,
				timestamp: serverTimestamp(),
				uid: user.uid,
				images: selectedImages,
				shareableLink: uuidv4() + "-" + uuidv4(),
			});
		}

		setSelectedImages([]);
		setOpenCreateAlbum(false);
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
					onChange={(e) => setNewAlbum(e.target.value)}
					value={newAlbum}
				/>
			</label>
			<button
				className={`${newAlbum ? "primary-button" : "disabled-button"}`}
				onClick={props.close}
				type="submit"
			>
				Create
			</button>
		</form>
	);
};

export default CreateAlbumForm;
