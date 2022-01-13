import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks
import useComponentVisible from "../../hooks/useComponentVisible";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

//Components
import { Modal, Form } from "../index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import {
	faEllipsisH,
	faLink,
	faTrash,
	faPen,
} from "@fortawesome/free-solid-svg-icons";

import "./AlbumList.scss";

const AlbumList = ({ photoAlbums, route, handleDelete, handleCopyLink }) => {
	const navigate = useNavigate();
	const {
		openModal,
		setOpenModal,
		setCurrentAlbumId,
	} = useCollectionContext();
	const updateAlbum = useUpdateDocument();

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

	const handleOpenModal = () => {
		setOpenModal(true);
		if (openModal) {
		}
		setIsComponentVisible(null);
	};

	const toggleDropdown = (id) => {
		setIsComponentVisible((visible) => (visible === id ? null : id));
		setCurrentAlbumId(id);
	};

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
							/* 	onClick={() => handleClickToAlbumId(album.id)} */
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

						{isComponentVisible === album.id ? (
							<div ref={ref} className="more-icon-dropdown">
								<span onClick={handleOpenModal}>
									<FontAwesomeIcon
										className="icon"
										icon={faPen}
									></FontAwesomeIcon>
									<p onClick={handleOpenModal}>Edit name</p>
								</span>
								<span onClick={handleDelete}>
									<FontAwesomeIcon
										className="icon"
										icon={faTrash}
									></FontAwesomeIcon>
									<p>Delete</p>
								</span>
								<span onClick={handleCopyLink}>
									<FontAwesomeIcon
										className="icon"
										icon={faLink}
									></FontAwesomeIcon>
									<p>Copy link</p>
								</span>
							</div>
						) : null}
					</li>
				))}
			</ul>

			{openModal && (
				<Modal
					close={() => setOpenModal(false)}
					title="Change name"
					body={<Form />}
				/>
			)}
		</>
	);
};

export default AlbumList;
