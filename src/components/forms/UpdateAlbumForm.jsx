//Context
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const UpdateAlbumForm = () => {
	const {
		updatedName,
		setUpdatedName,
		currentAlbumId,
		setOpenUpdateAlbum,
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
			setOpenUpdateAlbum(false);
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

export default UpdateAlbumForm;
