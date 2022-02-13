import React, { createContext, useContext, useState } from "react";

const CollectionContext = createContext();

const useCollectionContext = () => {
	return useContext(CollectionContext);
};

const CollectionContextProvider = ({ children }) => {
	const [selectedImages, setSelectedImages] = useState([]);
	const [openUpdateAlbum, setOpenUpdateAlbum] = useState(false);
	const [openCreateAlbum, setOpenCreateAlbum] = useState(false);
	const [currentAlbumId, setCurrentAlbumId] = useState(null);
	const [linkValue, setLinkValue] = useState("");
	const [copied, setCopied] = useState(false);

	const [updatedName, setUpdatedName] = useState("");

	const handleSelectedImages = (imageUrl, name, path, size, type, index) => {
		let imgObj = {
			name: name,
			path: path,
			size: size,
			type: type,
			url: imageUrl,
		};

		const imageExist = selectedImages.find(
			(item) => item.url == imgObj.url
		);

		if (imageExist) {
			let image = selectedImages.filter(
				(item) => item.url !== imgObj.url
			);
			setSelectedImages(image);
		} else {
			setSelectedImages([imgObj, ...selectedImages]);
		}
	};

	const values = {
		handleSelectedImages,
		selectedImages,
		setSelectedImages,
		currentAlbumId,
		setCurrentAlbumId,
		updatedName,
		setUpdatedName,
		openCreateAlbum,
		setOpenCreateAlbum,
		openUpdateAlbum,
		setOpenUpdateAlbum,
		linkValue,
		setLinkValue,
		copied,
		setCopied,
	};

	return (
		<CollectionContext.Provider value={values}>
			{children}
		</CollectionContext.Provider>
	);
};

export { useCollectionContext, CollectionContextProvider as default };
