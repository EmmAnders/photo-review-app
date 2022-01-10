import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Masonry from "react-masonry-css";
import { SRLWrapper } from "simple-react-lightbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
{
	/* <i class="fas fa-undo"></i> */
}

//Context imports
/* import { useCollectionContext } from "../../contexts/CollectionContext";
 */

//Firebase imports
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

//Hooks imports
import { useCollection } from "../../hooks/useCollection";

//Component imports
import { ImageGrid /* Modal, CollectionForm */ } from "../../components/index";

//styles
import "./ReviewAlbum.scss";
import "../../components/imageGrid/ImageGrid.scss";

const masonryBreakpoints = {
	default: 4,
	576: 3,
	768: 4,
	992: 5,
};

const ReviewCollection = () => {
	const { /*  documentId, */ linkId } = useParams();
	const navigate = useNavigate();
	const [doc, setDoc] = useState();
	const [images, setImages] = useState([]);
	const [totalImages, setTotalImages] = useState();
	const [selected, setSelected] = useState([]);
	const [trash, setTrash] = useState([]);

	const { documents: document, loading } = useCollection("photoAlbums", [
		"shareableLink",
		"==",
		linkId,
	]);

	useEffect(() => {
		//Add image objects from document to image array
		document &&
			document.map((d) => {
				let images = d.images;
				setImages(images);
				setTotalImages(d.images.length);
				setDoc(d);
			});
	}, [document]);

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

	/* 	console.log(document.uid); */
	/* console.log(doc);
	console.log(images); */

	const handleSubmit = async () => {
		let today = new Date();
		
		if (images.length < 1) {
			await addDoc(collection(db, "reviewedPhotoAlbums"), {
				name: doc.name + "-" + today.toLocaleString(),
				timestamp: serverTimestamp(),
				uid: doc.uid,
				images: selected,
				reviewedCollection: doc.id,
			});
			setSelected([]);
			setTrash([]);
			navigate("/");
		} else {
			alert("Please select all images");
		}
	};

	return (
		<div className="collection-review">
			<section className="collection-review-images">
				<SRLWrapper>
					<Masonry
						breakpointCols={masonryBreakpoints}
						className="masonry-grid"
						columnClassName="masonry-grid_column"
					>
						{images &&
							images.map((img, index) => (
								<div key={index}>
									<img src={img.url} />
									<div className="collection-review-icons">
										<FontAwesomeIcon
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
											className="thumb-icon"
											icon={faThumbsUp}
										/>
										<FontAwesomeIcon
											onClick={() =>
												handleReview(
													img.url,
													img.name,
													img.path,
													img.size,
													img.type,
													images,
													setImages,
													trash,
													setTrash
												)
											}
											className="thumb-icon"
											icon={faThumbsDown}
										/>
									</div>
								</div>
							))}
					</Masonry>
				</SRLWrapper>
			</section>

			<section className="collection-review-summary">
				<div className="collection-review-summary-selected">
					<h2>
						Selected Images {selected.length}/{totalImages}
					</h2>

					{selected &&
						selected.map((img) => (
							<p
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
								{img.name}
							</p>
						))}
				</div>
				<div className="collection-review-summary-trash">
					<h2>Trash</h2>
					{trash &&
						trash.map((img) => (
							<p
								onClick={() =>
									handleReview(
										img.url,
										img.name,
										img.path,
										img.size,
										img.type,
										trash,
										setTrash,
										images,
										setImages
									)
								}
							>
								{img.name}
							</p>
						))}
				</div>
				<button className="primary-button" onClick={handleSubmit}>
					Send Rewiew
				</button>
			</section>
		</div>
	);
};

export default ReviewCollection;
