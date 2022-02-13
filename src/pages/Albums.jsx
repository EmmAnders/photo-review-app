//Context imports
import { useAuthContext } from "../contexts/AuthContext";

//Hooks imports
import { useCollection } from "../hooks/useCollection";

//Component imports
import { AlbumList } from "../components/index";

const Albums = () => {
	const { user } = useAuthContext();
	const { documents, loading } = useCollection("photoAlbums", [
		"uid",
		"==",
		user.uid,
	]);

	return (
		<section className="albums">
			<div>
				{documents && (
					<AlbumList
						route={"album"}
						photoAlbums={documents}
						collection="photoAlbums"
					/>
				)}
			</div>
		</section>
	);
};

export default Albums;
