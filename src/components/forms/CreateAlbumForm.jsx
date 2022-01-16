import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

//Contexts
import { useAuthContext } from "../../contexts/AuthContext";
import { useCollectionContext } from "../../contexts/CollectionContext";

//Components
import { Form, FormInput } from "../index";

const CreateAlbumForm = ({ close }) => {
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
		<Form onSubmit={handleSubmit} cta="create" btnClassCondition={newAlbum}>
			<FormInput
				label="name"
				type="text"
				value={newAlbum}
				name="name"
				onChange={(e) => setNewAlbum(e.target.value)}
				onClick={close}
			/>
		</Form>
	);
};

export default CreateAlbumForm;
