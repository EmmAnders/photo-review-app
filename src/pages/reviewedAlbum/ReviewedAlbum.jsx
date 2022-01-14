import { useParams } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks imports
import { useDocument } from "../../hooks/useDocument";

//Component imports
import {
	Grid,
	CreateAlbumForm,
	ImageCard,
	Modal,
	UploadImageDropzone,
	Loader,
} from "../../components/index";

//Styles
import "../album/Album.scss";

const ReviewedAlbum = () => {
	const { id } = useParams();
	const { document, loading } = useDocument("reviewedPhotoAlbums", id);
	const {
		handleSelectedImages,
		selectedImages,
		activeCardElement,
		openCreateAlbum,
		setOpenCreateAlbum,
	} = useCollectionContext();

	return (
		<div className="album">
			{document && (
				<div className="album-header">
					<h1>
						Album {">"} {document.name}
					</h1>
				</div>
			)}

			<div className="album-create-btns">
				{selectedImages.length > 0 && (
					<>
						<button
							className="primary-button"
							onClick={() => setOpenCreateAlbum(true)}
						>
							Create new Album ({selectedImages.length})
						</button>
					</>
				)}
				<UploadImageDropzone images={document && document.images} />
			</div>

			{openCreateAlbum && (
				<Modal
					title="Create Album"
					body={<CreateAlbumForm />}
					close={() => setOpenCreateAlbum(false)}
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
				</>
			)}
		</div>
	);
};

export default ReviewedAlbum;
