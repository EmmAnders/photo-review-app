//Context
import { useCollectionContext } from "../../contexts/CollectionContext";

//Hooks
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

//Components
import { Form, FormInput } from "../index";

const UpdateAlbumForm = ({ collection }) => {
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
			updateAlbum.updateDocument(updatedName, collection, currentAlbumId);
			setUpdatedName("");
			setOpenUpdateAlbum(false);
		}
	};

	return (
		<>
			{updateAlbum.error && <p>Error</p>}
			<Form
				onSubmit={handleEditName}
				btnClassCondition={updatedName}
				btnText="Change name"
			>
				<FormInput
					type="text"
					onChange={handleNameInputChange}
					value={updatedName}
					name="name"
				/>
			</Form>
		</>
	);
};

export default UpdateAlbumForm;
