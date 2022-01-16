import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionContext } from "../contexts/CollectionContext";

//Hooks
import useComponentVisible from "../hooks/useComponentVisible";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

//Components
import { Modal, UpdateAlbumForm, Dropdown } from "./index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faLink, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const AlbumList = ({ photoAlbums, route }) => {
	const navigate = useNavigate();
	const {
		setCurrentAlbumId,
		openUpdateAlbum,
		setOpenUpdateAlbum,
	} = useCollectionContext();

	const handleClickToAlbumId = (id) => {
		navigate(`/${route}/${id}`);
	};

	const {
		ref,
		isComponentVisible,
		setIsComponentVisible,
	} = useComponentVisible(
		photoAlbums &&
			photoAlbums.reduce(
				(visible, { id }) => ({
					...visible,
					[id]: false,
				}),
				{}
			)
	);

	const handleUpdateAlbum = () => {
		setOpenUpdateAlbum(true);
		setIsComponentVisible(null);
	};

	const toggleDropdown = (id) => {
		setIsComponentVisible((visible) => (visible === id ? null : id));
		setCurrentAlbumId(id);
	};

	const dropdownItems = [
		{ name: "Edit name", icon: faPen, onClick: handleUpdateAlbum },
		{ name: "Delete", icon: faTrash },
		{ name: "Copy link", icon: faLink },
	];

	return (
		<>
			<ul className="album-list">
				<li className="album-list-labels">
					<p>Name</p>
					<p>Created at</p>
					<p></p>
				</li>

				{photoAlbums.map((album) => (
					<li className="album-list-item" key={album.id}>
						<div
							onClick={() => handleClickToAlbumId(album.id)}
							className="album-list-item-title"
						>
							<FontAwesomeIcon
								className="icon"
								icon={faFolder}
							></FontAwesomeIcon>

							<div onClick={() => handleClickToAlbumId(album.id)}>
								{album.name}
							</div>
						</div>
						<div
							onClick={() => handleClickToAlbumId(album.id)}
							className="album-list-item-created-at"
						>
							<div>
								date
								{/* {album.timestamp.toDate().toDateString()} */}
							</div>
						</div>
						<div
							key={album.id}
							className="album-list-item-more-btn"
						>
							<FontAwesomeIcon
								onClick={() => toggleDropdown(album.id)}
								icon={faEllipsisH}
							></FontAwesomeIcon>
						</div>

						{isComponentVisible === album.id && (
							<div ref={ref}>
								<Dropdown
									handleUpdateAlbum={handleUpdateAlbum}
									items={dropdownItems}
									title={album.name}
								/>
							</div>
						)}
					</li>
				))}
			</ul>

			{openUpdateAlbum && (
				<Modal
					close={() => setOpenUpdateAlbum(false)}
					title="Change name"
					body={<UpdateAlbumForm />}
				/>
			)}
		</>
	);
};

export default AlbumList;
