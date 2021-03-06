//Context imports
/* import { useCollectionContext } from "../../contexts/CollectionContext"; */
import { useAuthContext } from "../contexts/AuthContext";

//Hooks imports
import { useCollection } from "../hooks/useCollection";

//Component imports
import { AlbumList } from "../components/index";

const ReviewedAlbums = () => {
	const { user } = useAuthContext();

	const { documents } = useCollection("reviewedPhotoAlbums", [
		"uid",
		"==",
		user.uid,
	]);

	return (
		<section className="reviewed-albums">
			<div>
				{documents && (
					<AlbumList
						route={"reviewed-album"}
						photoAlbums={documents}
						collection="reviewedPhotoAlbums"
					/>
				)}
			</div>
		</section>
	);
};

export default ReviewedAlbums;
