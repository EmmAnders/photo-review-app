import { useParams } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks imports
import { useDocument } from "../../hooks/useDocument";

//Component imports
import {
	ImageGrid,
	Modal,
	AlbumForm,
	UploadImageDropzone,
} from "../../components/index";

//Styles
import "./Album.scss";

const Album = () => {
	const { selectedImages, openModal, setOpenModal } = useCollectionContext();
	const { id } = useParams();
	const { document, loading } = useDocument("photoAlbums", id);

	return (
		<div className="collection">
			{document && (
				<div className="collection-header">
					<h1>Album/{document.name}</h1>
					<p>
						/review-album/{id}/{document.shareableLink}
					</p>
				</div>
			)}

			<div className="collection-create-btns">
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

			<ImageGrid document={document} loading={loading} />
			<UploadImageDropzone />
		</div>
	);
};

export default Album;
