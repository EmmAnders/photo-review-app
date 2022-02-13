import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

//Context imports
import { useCollectionContext } from "../contexts/CollectionContext";

//Hooks imports
import { useDocument } from "../hooks/useDocument";

//Component imports
import { Grid, Card, Dropzone, Loader } from "../components/index";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const ReviewedAlbum = (props) => {
	const { id } = useParams();
	const { document, loading } = useDocument("reviewedPhotoAlbums", id);
	const {
		handleSelectedImages,
		selectedImages,
		activeCardElement,
		setOpenCreateAlbum,
	} = useCollectionContext();

	const [value, setValue] = useState("");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		document &&
			setValue(
				`https://localhost:3000/review-album/${id}/${document.shareableLink}`
			);
	}, [document]);

	return (
		<div className="reviewed-album">
			{document && (
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl">
						Album {">"} {document.name}
					</h1>

					<CopyToClipboard
						options={{ debug: props.debug, message: "" }}
						text={value}
						onCopy={() => setCopied(true)}
					>
						<span>
							<FontAwesomeIcon
								className="mr-2"
								icon={faLink}
							></FontAwesomeIcon>
							<span className="text-md">
								{copied ? "Copied!" : "Copy link"}
							</span>
						</span>
					</CopyToClipboard>
				</div>
			)}

			<div className="grid grid-cols-12 gap-x-3 mb-16">
				<Dropzone
					className="col-start-1 col-end-5  md:col-end-6 bg-gray-200 text-black rounded-full md:px-8 py-3 text-center"
					images={document && document.images}
					collection="reviewedPhotoAlbums"
				/>

				{selectedImages.length > 0 && (
					<>
						<button
							className="col-start-5 col-end-10 md:col-start-6 md:col-end-11 bg-gray-200 text-black text-center rounded-full md:px-8 py-3"
							onClick={() => setOpenCreateAlbum(true)}
						>
							Create new Album ({selectedImages.length})
						</button>
					</>
				)}
			</div>

			{document && (
				<>
					{loading && <Loader />}
					<Grid>
						{document.images.map((img, index) => (
							<Card
								activeClass={
									selectedImages.length > 0
										? "image-card-checkbox-checked"
										: "image-card-checkbox"
								}
								select={() =>
									handleSelectedImages(
										img.url,
										img.name,
										img.path,
										img.size,
										img.type,
										index
									)
								}
								key={index}
								image={img}
								activeId={
									index === activeCardElement
										? "image-card-active"
										: "image-card"
								}
							/>
						))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default ReviewedAlbum;
