import { useParams } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks imports
import { useDocument } from "../../hooks/useDocument";

//Component imports
import {
	ImageGrid,
	Modal,
	CollectionForm,
	UploadImageDropzone,
} from "../../components/index";

//Styles
import "./Collection.scss";

const Collection = () => {
	const { checkedImages, openModal, setOpenModal } = useCollectionContext();
	const { id } = useParams();
	const { document, loading } = useDocument("photoCollections", id);

	return (
		<div className="collection">
			{document && (
				<div className="collection-header">
					<h1>Collection/{document.name}</h1>
					<p>Copy link</p>
				</div>
			)}

			<div className="collection-create-btns">
				<button className="primary-button">Upload</button>
				{checkedImages.length > 0 && (
					<button
						className="primary-button"
						onClick={() => setOpenModal(true)}
					>
						Create new collection ({checkedImages.length})
					</button>
				)}
			</div>

			{openModal && (
				<Modal
					title="Create Collection"
					body={<CollectionForm />}
					close={() => setOpenModal(false)}
				/>
			)}

			<ImageGrid document={document} loading={loading} />
			<UploadImageDropzone />
		</div>
	);
};

export default Collection;
