import { useParams } from "react-router-dom";

//Hooks imports
import { useDocument } from "../../hooks/useDocument";

//Component imports
import { MasonryGrid } from "../../components/index";

//Styles
import "./ReviewedAlbum.scss";

const ReviewedAlbum = () => {
	const { id } = useParams();
	const { document, loading } = useDocument("reviewedPhotoAlbums", id);

	return (
		<div>
			{document && (
				<div className="collection-header">
					<h1>Album/{document.name}</h1>
				</div>
			)}
			<MasonryGrid document={document} loading={loading} />
		</div>
	);
};

export default ReviewedAlbum;
