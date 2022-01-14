//Context
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const Form = () => {
	const {
		updatedName,
		setUpdatedName,
		currentAlbumId,
		setOpenModal,
	} = useCollectionContext();

	const updateAlbum = useUpdateDocument();

	const handleNameInputChange = (e) => {
		setUpdatedName(e.target.value);
	};

	const handleEditName = (e) => {
		e.preventDefault();

		if (!updateAlbum.isLoading) {
			updateAlbum.updateDocument(
				updatedName,
				"photoAlbums",
				currentAlbumId
			);
			setUpdatedName("");
			setOpenModal(false);
		}
	};

	return (
		<>
			{updateAlbum.error && <p>Error</p>}

			<form className="form" onSubmit={handleEditName}>
				<label>
					<input
						required
						placeholder="Album name"
						type="text"
						onChange={handleNameInputChange}
						value={updatedName}
					/>
				</label>
				<button
					className={`${
						updatedName ? "primary-button" : "disabled-button"
					}`}
					type="submit"
				>
					{updateAlbum.isLoading ? (
						<p>loading</p>
					) : (
						<p>Change name</p>
					)}
				</button>
			</form>
		</>
	);
};

export default Form;
