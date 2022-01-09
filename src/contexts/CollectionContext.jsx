import React, { createContext, useContext, useState } from "react";

const CollectionContext = createContext();

const useCollectionContext = () => {
	return useContext(CollectionContext);
};

const CollectionContextProvider = ({ children }) => {
	const [checkedImages, setCheckedImages] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	
	const values = { checkedImages, setCheckedImages, openModal, setOpenModal };

	return (
		<CollectionContext.Provider value={values}>
			{children}
		</CollectionContext.Provider>
	);
};

export { useCollectionContext, CollectionContextProvider as default };
