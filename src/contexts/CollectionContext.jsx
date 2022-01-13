import React, { createContext, useContext, useState } from "react";

const CollectionContext = createContext();

const useCollectionContext = () => {
	return useContext(CollectionContext);
};

const CollectionContextProvider = ({ children }) => {
	const [selectedImages, setSelectedImages] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [activeCardElement, setActiveCardElement] = useState(null);

	const handleSelectedImages = (imageUrl, name, path, size, type, index) => {
		setActiveCardElement(index);

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
		activeCardElement,
		setActiveCardElement,
		openModal,
		setOpenModal,
	};

	return (
		<CollectionContext.Provider value={values}>
			{children}
		</CollectionContext.Provider>
	);
};

export { useCollectionContext, CollectionContextProvider as default };
