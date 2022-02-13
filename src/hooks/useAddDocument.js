import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const useAddDocument = () => {
	const { user } = useAuthContext();
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const addDocument = async (col, newAlbum, selectedImages) => {
		setSuccess(false);
		setError(false);
		setisLoading(true);

		try {
			await addDoc(collection(db, col), {
				name: newAlbum,
				uid: user.uid,
				images: selectedImages,
				shareableLink: uuidv4() + "-" + uuidv4(),
				timestamp: serverTimestamp(),
			});

			setSuccess(true);
			setisLoading(false);
		} catch (e) {
			setError(e.message);
			setisLoading(false);
			console.log(e.message);
		}
	};

	return {
		isLoading,
		error,
		success,
		addDocument,
	};
};
