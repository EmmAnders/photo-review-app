import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const useAddDocument = () => {
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const addDocument = async (docName, col, id) => {
		setSuccess(false);
		setError(false);
		setisLoading(true);

		try {
			await addDoc(collection(db, col), {
				timestamp: serverTimestamp(),
				shareableLink: uuidv4() + "-" + uuidv4(),
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
		addDocument,
	};
};
