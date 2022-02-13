import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Firebase imports
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

//Hooks imports
import { useCollection } from "../hooks/useCollection";

//Component imports
import { Grid } from "../components/index";

//Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

const ReviewAlbum = () => {
	const { linkId } = useParams();
	const navigate = useNavigate();
	const [doc, setDoc] = useState();
	const [images, setImages] = useState([]);
	const [totalImages, setTotalImages] = useState(null);
	const [selected, setSelected] = useState([]);
	const [unselected, setUnselected] = useState([]);

	const photoAlbumCollection = useCollection("photoAlbums", [
		"shareableLink",
		"==",
		linkId,
	]);

	const reviewedPhotoAlbumCollection = useCollection("reviewedPhotoAlbums", [
		"shareableLink",
		"==",
		linkId,
	]);

	useEffect(() => {
		//Add image objects from document to image array
		photoAlbumCollection.documents &&
			photoAlbumCollection.documents.map((d) => {
				let images = d.images;
				setImages(images);
				setTotalImages(d.images.length);
				setDoc(d);
			});

		reviewedPhotoAlbumCollection.documents &&
			reviewedPhotoAlbumCollection.documents.map((d) => {
				let images = d.images;
				setImages(images);
				setTotalImages(d.images.length);
				setDoc(d);
			});
		setSelected([]);
		setUnselected([]);
	}, [
		photoAlbumCollection.documents,
		reviewedPhotoAlbumCollection.documents,
	]);

	const handleReview = (
		imageUrl,
		name,
		path,
		size,
		type,
		originalArray,
		setOriginalArray,
		newArray,
		setNewArray
	) => {
		let imgObj = {
			name: name,
			path: path,
			size: size,
			type: type,
			url: imageUrl,
		};

		const imageExist = newArray.find((image) => image.url == imgObj.url);

		if (imageExist) {
			return;
		} else {
			let updatedImgArr = originalArray.filter((el) => {
				return el.url != imgObj.url;
			});
			setOriginalArray(updatedImgArr);
			setNewArray([imgObj, ...newArray]);
		}
	};

	const handleSubmit = async () => {
		let today = new Date();

		if (images.length < 1) {
			await addDoc(collection(db, "reviewedPhotoAlbums"), {
				name: doc.name + "-" + today.toLocaleString(),
				timestamp: serverTimestamp(),
				uid: doc.uid,
				images: selected,
				reviewedAlbum: doc.id,
				shareableLink: uuidv4() + "-" + uuidv4(),
			});
			setSelected([]);
			setUnselected([]);
			navigate("/");
		} else {
			alert("Select all images");
		}
	};

	return (
		<section className="md:grid md:grid-cols-12 gap-x-16">
			<section className="md:col-start-1 md:col-end-10 mb-16 md:mb-0">
				<Grid>
					{images &&
						images.map((img, index) => (
							<div key={index}>
								<img src={img.url} />
								<div className="flex justify-evenly items-center mt-3">
									<div
										className="bg-neutral-200 w-6 h-6 rounded-full text-center cursor-pointer"
										onClick={() =>
											handleReview(
												img.url,
												img.name,
												img.path,
												img.size,
												img.type,
												images,
												setImages,
												unselected,
												setUnselected
											)
										}
									>
										-
									</div>
									<div
										className="bg-neutral-200 w-6 h-6 rounded-full text-center cursor-pointer"
										onClick={() =>
											handleReview(
												img.url,
												img.name,
												img.path,
												img.size,
												img.type,
												images,
												setImages,
												selected,
												setSelected
											)
										}
									>
										+
									</div>
								</div>
							</div>
						))}
				</Grid>
			</section>

			<section className="md:col-start-10 md:col-end-13 w-full">
				<div>
					<div className="mb-4">
						<h3 className="text-xl mb-2">Favorites</h3>
						<div className="grid grid-cols-2 gap-2">
							{selected &&
								selected.map((img, index) => (
									<div className="h-20 relative">
										<img
											className="h-full w-full bg-center bg-cover"
											key={index}
											src={img.url}
										></img>
										<div
											className=" flex justify-center items-center w-7 h-7 rounded-full bg-neutral-300  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
											onClick={() =>
												handleReview(
													img.url,
													img.name,
													img.path,
													img.size,
													img.type,
													selected,
													setSelected,
													images,
													setImages
												)
											}
										>
											<FontAwesomeIcon
												className="w-4 h-4 text-center"
												icon={faUndo}
											></FontAwesomeIcon>
										</div>
									</div>
								))}
						</div>
					</div>

					<div className="mb-4">
						<h3 className="text-xl mb-2">Unselected</h3>
						<div className="grid grid-cols-2 gap-2">
							{unselected &&
								unselected.map((img, index) => (
									<div className="h-20 relative">
										<img
											className="h-full w-full bg-center bg-cover"
											key={index}
											src={img.url}
										></img>
										<div
											className=" flex justify-center items-center w-7 h-7 rounded-full bg-neutral-300  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
											onClick={() =>
												handleReview(
													img.url,
													img.name,
													img.path,
													img.size,
													img.type,
													unselected,
													setUnselected,
													images,
													setImages
												)
											}
										>
											<FontAwesomeIcon
												className="w-4 h-4 text-center"
												icon={faUndo}
											></FontAwesomeIcon>
										</div>
									</div>
								))}
						</div>
					</div>
					<div>
						<button
							className="w-full bg-black text-white rounded-full px-8 py-3 mt-4"
							onClick={handleSubmit}
						>
							Save ({selected.length}/{totalImages})
						</button>
					</div>
				</div>
			</section>
		</section>
	);
};

export default ReviewAlbum;
