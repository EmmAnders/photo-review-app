import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export const useDocument = (col, id) => {
	const [loading, setLoading] = useState(true);
	const [document, setDocument] = useState();

	useEffect(() => {
		setLoading(true);
		const ref = doc(db, col, id);
		const unsub = onSnapshot(ref, (snapshot) => {
			if (!snapshot.exists()) {
				setDocument(false);
				setLoading(false);
				return;
			}
			setDocument(snapshot.data());
			setLoading(false);
		});

		return () => unsub();
	}, [id]);

	return { document, loading };
};
