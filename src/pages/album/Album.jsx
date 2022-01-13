import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks imports
import { useDocument } from "../../hooks/useDocument";

//Component imports
import {
	Grid,
	ImageCard,
	Modal,
	AlbumForm,
	UploadImageDropzone,
	Loader,
} from "../../components/index";

//Styles
import "./Album.scss";

const Album = (props) => {
	const {
		handleSelectedImages,
		selectedImages,
		activeCardElement,
		setActiveCardElement,
		openModal,
		setOpenModal,
	} = useCollectionContext();
	const { id } = useParams();
	const { document, loading } = useDocument("photoAlbums", id);
	const [value, setValue] = useState("");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		document && setValue(`/review-album/${id}/${document.shareableLink}`);
	}, [document]);

	return (
		<div className="album">
			{document && (
				<div className="album-header">
					<h1>
						Album {">"} {document.name}
					</h1>

					<CopyToClipboard
						options={{ debug: props.debug, message: "" }}
						text={value}
						onCopy={() => setCopied(true)}
					>
						<span>
							<FontAwesomeIcon
								className="icon-copy-link"
								icon={faLink}
							></FontAwesomeIcon>
							<span>{copied ? "Copied!" : "Copy link"}</span>
						</span>
					</CopyToClipboard>
				</div>
			)}

			<div className="album-create-btns">
				<button className="primary-button">Upload</button>
				{selectedImages.length > 0 && (
					<button
						className="primary-button"
						onClick={() => setOpenModal(true)}
					>
						Create new Album ({selectedImages.length})
					</button>
				)}
			</div>

			{openModal && (
				<Modal
					title="Create Album"
					body={<AlbumForm />}
					close={() => setOpenModal(false)}
				/>
			)}

			{document && (
				<>
					{loading && <Loader />}
					<Grid>
						{document.images.map((img, index) => (
							<ImageCard
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
					<UploadImageDropzone />
				</>
			)}
		</div>
	);
};

export default Album;
