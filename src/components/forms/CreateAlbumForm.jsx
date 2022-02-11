import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

//Contexts
import { useAuthContext } from "../../contexts/AuthContext";
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks
import { useAddDocument } from "../../hooks/useAddDocument";
//Components
import { Form, FormInput } from "../index";

const CreateAlbumForm = ({ close }) => {
	const { user } = useAuthContext();
	const {
		selectedImages,
		setSelectedImages,
		setOpenCreateAlbum,
	} = useCollectionContext();

	const addAlbum = useAddDocument();

	const navigate = useNavigate();
	const [newAlbum, setNewAlbum] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newAlbum == "" && !addAlbum.isLoading) {
			addAlbum.addDocument("photoAlbums", newAlbum, selectedImages);
		}
		setSelectedImages([]);
		setOpenCreateAlbum(false);
		navigate("/");
	};

	return (
		<>
			{addAlbum.error && <p>Error</p>}
			<Form
				onSubmit={handleSubmit}
				cta="create"
				btnClassCondition={newAlbum}
				btnText="Create Album"
			>
				<FormInput
					label="name"
					type="text"
					value={newAlbum}
					name="name"
					onChange={(e) => setNewAlbum(e.target.value)}
					onClick={close}
				/>
			</Form>
		</>
	);
};

export default CreateAlbumForm;
