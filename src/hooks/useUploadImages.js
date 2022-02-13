import { useState } from "react";

import { useAuthContext } from "../contexts/AuthContext";

//firebase imports
import { db, storage } from "../firebase/config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const useUploadImages = () => {
	const [error, setError] = useState(null);
	const [isError, setIsError] = useState(null);
	const [isUploading, setIsUploading] = useState(null);
	const [isSuccess, setIsSuccess] = useState(null);
	const [progress, setProgress] = useState(null);

	const { user } = useAuthContext();

	const upload = async (image, documentId, collection) => {
		setError(null);
		setIsError(null);
		setIsSuccess(null);
		setIsUploading(true);
		setProgress(null);

		if (!image instanceof File) {
			setError("Not accepted file");
			setIsError(true);
			setIsUploading(false);
			return;
		}

		try {
			const storageRef = ref(storage, `${user.uid}/${image.name}`);
			const uploadTask = uploadBytesResumable(storageRef, image);

			uploadTask.on("state_changed", (snapshot) => {
				setProgress(
					Math.round(
						snapshot.bytesTransferred / snapshot.totalBytes
					) * 100
				);
			});

			await uploadTask.then();

			const downloadUrl = await getDownloadURL(storageRef);
			const documentRef = doc(db, collection, documentId);

			await updateDoc(documentRef, {
				images: arrayUnion({
					name: image.name,
					path: storageRef.fullPath,
					size: image.size,
					type: image.type,
					url: downloadUrl,
				}),
			});
			setProgress(null);
			setIsSuccess(true);
			setIsUploading(false);
		} catch (e) {
			console.log("ERROOOOOR", e.message);
			setError(e.message);
			setIsError(true);
			setIsUploading(false);
			setIsSuccess(false);
		}
	};

	return { error, isError, isUploading, isSuccess, progress, upload };
};

export default useUploadImages;
