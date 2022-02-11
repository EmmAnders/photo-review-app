import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Firebase imports
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

//Hooks imports
import { useCollection } from "../hooks/useCollection"; /* MasonryGrid  */ /* Modal, CollectionForm */ /* "../../components/index"; */ //styles

//Component imports
import { MasonryGrid, Grid } from "../components/index";

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
	const [openSummary, setOpenSummary] = useState(false);

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
		setSelected([]);
		setUnselected([]);
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

	const handleSubmit = async () => {
		let today = new Date();

		if (images.length < 1) {
			await addDoc(collection(db, "reviewedPhotoAlbums"), {
				name: doc.name + "-" + today.toLocaleString(),
				timestamp: serverTimestamp(),
				uid: doc.uid,
				images: selected,
				reviewedAlbum: doc.id,
			});
			setSelected([]);
			setUnselected([]);
			navigate("/");
		} else {
			alert("Select all images");
		}
	};

	const handleOpenSummary = () => {
		setOpenSummary(!openSummary);
	};

	return (
		<section className="customer-selection">
			<section className="customer-selection-images">
				<MasonryGrid>
					{images &&
						images.map((img, index) => (
							<div key={index}>
								<img src={img.url} />
								<div className="select-btns">
									<p
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
									</p>
									<p
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
									</p>
								</div>
							</div>
						))}
				</MasonryGrid>
			</section>

			<section
				style={{
					height: !openSummary ? "0" : "70vh",
				}}
				className="customer-selection-summary"
			>
				{selected.length < 1 && unselected.length < 1 && (
					<p className="selection-msg">0 selected images </p>
				)}

				<button
					onClick={handleOpenSummary}
					className="customer-selection-summary-btn"
				>
					{openSummary ? (
						<p>Close</p>
					) : (
						<p>Summary ({selected.length + "/" + totalImages})</p>
					)}
				</button>
				<div className="customer-selection-summary-choices">
					{openSummary && (
						<div
							className={`customer-selection-summary-selected `}
							style={{
								display:
									selected.length < 1 ? "none" : "static",
							}}
						>
							<h3>Favorites</h3>
							<Grid>
								{selected &&
									selected.map((img, index) => (
										<div className="img-wrapper">
											<img
												key={index}
												src={img.url}
											></img>
											<FontAwesomeIcon
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
												icon={faUndo}
												className="regret-icon"
											></FontAwesomeIcon>
										</div>
									))}
							</Grid>
						</div>
					)}
					{openSummary && (
						<>
							<div
								style={{
									display:
										unselected.length < 1
											? "none"
											: "static",
								}}
								className="customer-selection-summary-unselected"
							>
								<h3>Unselected</h3>
								<Grid>
									{unselected &&
										unselected.map((img, index) => (
											<div className="img-wrapper">
												<img
													key={index}
													src={img.url}
												></img>
												<FontAwesomeIcon
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
													icon={faUndo}
													className="regret-icon"
												></FontAwesomeIcon>
											</div>
										))}
								</Grid>
							</div>
							<div className="save-selection">
								<button
									className="primary-button"
									onClick={handleSubmit}
								>
									Save ({selected.length}/{totalImages})
								</button>
							</div>
						</>
					)}
				</div>
			</section>
		</section>
	);
};

export default ReviewAlbum;
