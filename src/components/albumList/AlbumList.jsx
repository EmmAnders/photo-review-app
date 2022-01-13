import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

import "./AlbumList.scss";

const AlbumList = ({ photoAlbums, route }) => {
	const navigate = useNavigate();

	const handleClickToAlbumId = (id) => {
		navigate(`/${route}/${id}`);
	};

	return (
		<ul className="album-list">
			<li className="album-list-labels">
				<p>Name</p>
				<p>Created at</p>
			</li>
			{photoAlbums.map((album) => (
				<li
					className="album-list-item"
					key={album.id}
					onClick={() => handleClickToAlbumId(album.id)}
				>
					<div className="album-list-item-title">
						<div className="folder-icon">
							<FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>
						</div>
						<div>{album.name}</div>
					</div>
					<div>{/* {album.timestamp.toDate().toDateString()} */}</div>
				</li>
			))}
		</ul>
	);
};

export default AlbumList;
