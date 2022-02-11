import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useUpdateDocument = () => {
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const updateDocument = async (name, col, id) => {
		setSuccess(false);
		setError(false);
		setisLoading(true);

		try {
			const documentRef = doc(db, col, id);
			await updateDoc(documentRef, {
				name: name,
			});
			setSuccess(true);
			setisLoading(false);
			
		} catch (e) {
			setError(e.message);
			setisLoading(false);
		}
	};

	return {
		isLoading,
		error,
		success,
		updateDocument,
	};
};
