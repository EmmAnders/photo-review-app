import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCollectionContext } from "../../contexts/CollectionContext";

//Firebase imports
import { db } from "../../firebase/config";
import {
	collection,
	addDoc,
	serverTimestamp,
	arrayUnion,
} from "firebase/firestore";

const CollectionForm = (props) => {
	const { user } = useAuthContext();
	const {
		checkedImages,
		setCheckedImages,
		setOpenModal,
	} = useCollectionContext();

	const navigate = useNavigate();
	const [newCollection, setNewCollection] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newCollection == " ") {
			await addDoc(collection(db, "photoCollections"), {
				name: newCollection,
				timestamp: serverTimestamp(),
				uid: user.uid,
				images: checkedImages,
			});
		}
		setCheckedImages([]);
		setOpenModal(false);
		navigate("/");
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<label>
				<span>Name</span>
				<input
					required
					placeholder="Collection name"
					type="text"
					onChange={(e) => setNewCollection(e.target.value)}
					value={newCollection}
				/>
			</label>
			<button onClick={props.close} type="submit">
				Create
			</button>
		</form>
	);
};

export default CollectionForm;
