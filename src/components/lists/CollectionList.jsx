import { useNavigate } from "react-router-dom";

const CollectionList = ({ photoCollections }) => {
	const navigate = useNavigate();
	const handleClick = async (id) => {
		navigate(`/collection/${id}`);
	};

	return (
		<div>
			<ul>
				{photoCollections.map((collection) => (
					<li
						key={collection.id}
						onClick={() => handleClick(collection.id)}
					>
						{collection.name} -{" "}
						{/* {collection.timestamp.toString()} */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CollectionList;
