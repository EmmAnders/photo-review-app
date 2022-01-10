import { useNavigate } from "react-router-dom";

const AlbumList = ({ photoAlbums, route }) => {
	const navigate = useNavigate();

	const handleClickToAlbumId = (id) => {
		navigate(`/${route}/${id}`);
	};

	return (
		<div>
			<ul>
				{photoAlbums.map((album) => (
					<li
						key={album.id}
						onClick={() => handleClickToAlbumId(album.id)}
					>
						{album.name} - {/* {collection.timestamp.toString()} */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
