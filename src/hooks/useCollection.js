import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

//Firebase imports
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy,
} from "firebase/firestore";

export const useCollection = (col, _q) => {
	const [documents, setDocuments] = useState(null);

	const q = useRef(_q).current;

	useEffect(() => {
		let ref = collection(db, col);

		if (q) {
			ref = query(ref, where(...q), orderBy("timestamp", "desc"));
		}

		const unsub = onSnapshot(ref, (snapshot) => {
			let results = [];

			snapshot.docs.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});
			setDocuments(results);
		});

		return () => unsub();
	}, [col]);

	return { documents };
};
