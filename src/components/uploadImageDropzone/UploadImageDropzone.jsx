import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

//Hooks Imports
import useUploadImages from "../../hooks/useUploadImages";

//Styles
import "./UploadImageDropzone.scss";

const UploadImageDropzone = () => {
	const { id } = useParams();
	const uploadImages = useUploadImages();
	const onDrop = useCallback((acceptedFiles) => {
		if (!acceptedFiles.length) {
			return;
		}

		uploadImages.upload(acceptedFiles[0], id);
	}, []);

	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: "image/jpeg, image/jpg, image/png",
		onDrop,
	});

	return (
		<>
			<div {...getRootProps()} className="dropzone-container">
				<input {...getInputProps()} className="dropzone" />
				{isDragActive ? (
					isDragAccept ? (
						<p>Drop that photo</p>
					) : (
						<p>Drop didn't work</p>
					)
				) : (
					<p>Drop photos here</p>
				)}
			</div>
			{uploadImages.progress !== null && <p>{uploadImages.progress}</p>}
			{uploadImages.isError && <p>{uploadImages.error}</p>}
			{uploadImages.isSuccess && <p>{uploadImages.success}</p>}
		</>
	);
};

export default UploadImageDropzone;
