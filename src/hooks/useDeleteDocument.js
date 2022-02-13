import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useDeleteDocument = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const deleteDocument = async (col, albumId) => {
		setError(null);
		setIsLoading(true);

		try {
			await deleteDoc(doc(db, col, albumId));
		} catch (e) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		error,
		isLoading,
		deleteDocument,
	};
};
