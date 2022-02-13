import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionContext } from "../contexts/CollectionContext";

//Hooks
import useComponentVisible from "../hooks/useComponentVisible";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

//Components
import { Modal, UpdateAlbumForm, Dropdown } from "./index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faLink, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const AlbumList = ({ photoAlbums, collection, route }) => {
	const navigate = useNavigate();
	const {
		setCurrentAlbumId,
		openUpdateAlbum,
		setOpenUpdateAlbum,
		setCurrentAlbumName,
	} = useCollectionContext();

	const deleteAlbum = useDeleteDocument();

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

	const handleClickToAlbumId = (id) => {
		navigate(`/${route}/${id}`);
	};

	const handleUpdateAlbum = () => {
		setOpenUpdateAlbum(true);
		setIsComponentVisible(null);
	};

	const handleDeleteAlbum = (albumId) => {
		if (!deleteAlbum.isLoading) {
			deleteAlbum.deleteDocument(collection, albumId);
		}
		/* setIsComponentVisible(null); */
	};

	const toggleDropdown = (id) => {
		setIsComponentVisible((visible) => (visible === id ? null : id));
		setCurrentAlbumId(id);
		setCurrentAlbumName();
	};

	return (
		<>
			<ul className="album-list pb-16 md:pb-0">
				<li className="flex justify-between items-center mb-4">
					<p className="">Name</p>
					<p className="">Created at</p>
					<p></p>
				</li>

				{photoAlbums.map((album) => (
					<li
						className="relative border rounded-md px-4 py-2 mb-4 border-neutral-300 flex justify-between items-center"
						key={album.id}
					>
						<div
							onClick={() => handleClickToAlbumId(album.id)}
							className="flex items-center w-1/3"
						>
							<FontAwesomeIcon
								className="mr-2"
								icon={faFolder}
							></FontAwesomeIcon>

							<div onClick={() => handleClickToAlbumId(album.id)}>
								{album.name}
							</div>
						</div>
						<div
							onClick={() => handleClickToAlbumId(album.id)}
							className="w-1/3"
						>
							<div className=" text-center">
								date
								{/* {album.timestamp.toDate().toDateString()} */}
							</div>
						</div>
						<div key={album.id} className=" w-1/3 text-right">
							<FontAwesomeIcon
								onClick={() => toggleDropdown(album.id)}
								icon={faEllipsisH}
							></FontAwesomeIcon>
						</div>

						{isComponentVisible === album.id && (
							<div ref={ref}>
								<ul className="absolute top-full rounded right-0 bg-white border border-neutral-300  z-20">
									<p className="dropdown-title px-4 py-2 border-b border-neutral-300">
										{album.name}
									</p>
									<li
										className="flex items-center px-4 py-2 border-b border-neutral-300 cursor-pointer "
										onClick={handleUpdateAlbum}
									>
										<FontAwesomeIcon
											className="mr-1 h-3"
											icon={faPen}
										></FontAwesomeIcon>
										<p className="text-sm">Edit name</p>
									</li>
									<li className="flex items-center px-4 py-2 border-b border-neutral-300 cursor-pointer">
										<FontAwesomeIcon
											className="mr-1 h-3"
											icon={faTrash}
										></FontAwesomeIcon>
										<p
											onClick={() =>
												handleDeleteAlbum(album.id)
											}
											className="text-sm"
										>
											Delete
										</p>
									</li>
									<li
										className="flex items-center px-4 py-2 border-b border-neutral-300 cursor-pointer"
										onClick={handleUpdateAlbum}
									>
										<FontAwesomeIcon
											className="mr-1 h-3"
											icon={faLink}
										></FontAwesomeIcon>
										<p className="text-sm">Share album</p>
									</li>
								</ul>
							</div>
						)}
					</li>
				))}
			</ul>

			{openUpdateAlbum && (
				<Modal
					close={() => setOpenUpdateAlbum(false)}
					title="Change name"
					body={<UpdateAlbumForm collection={collection} />}
				/>
			)}
		</>
	);
};

export default AlbumList;
