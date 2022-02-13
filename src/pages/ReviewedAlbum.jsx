import { useEffect } from "react";
import { useParams } from "react-router-dom";

//Context imports
import { useCollectionContext } from "../contexts/CollectionContext";

//Hooks imports
import { useDocument } from "../hooks/useDocument";

//Component imports
import { AlbumModule } from "../components/index";

const ReviewedAlbum = (props) => {
	const { id } = useParams();
	const { document, loading } = useDocument("reviewedPhotoAlbums", id);
	const { setLinkValue, setCopied } = useCollectionContext();

	useEffect(() => {
		if (document) {
			setCopied(false);
			setLinkValue(
				`https://phoapp.netlify.app/review-album/${id}/${document.shareableLink}`
			);
		}
	}, [document]);

	return (
		<AlbumModule
			document={document}
			loading={loading}
			collection={"reviewedPhotoAlbums"}
		/>
	);
};

export default ReviewedAlbum;
