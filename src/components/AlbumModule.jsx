import { CopyToClipboard } from "react-copy-to-clipboard";

//Context imports
import { useCollectionContext } from "../contexts/CollectionContext";

//Hooks imports
import { useDocument } from "../hooks/useDocument";

//Component imports
import { Grid, Card, Dropzone, Loader } from "./index";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const AlbumModule = ({ debug, document, loading, collection }) => {
	const {
		handleSelectedImages,
		selectedImages,
		setOpenCreateAlbum,
		linkValue,
		copied,
		setCopied,
	} = useCollectionContext();

	return (
		<div className="album mb-24 md:mb-0">
			{document && (
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl">
						Album {">"} {document.name}
					</h1>

					<CopyToClipboard
						options={{ debug: debug, message: "" }}
						text={linkValue}
						onCopy={() => setCopied(true)}
					>
						<span>
							<FontAwesomeIcon
								className="mr-2"
								icon={faLink}
							></FontAwesomeIcon>
							<span className="text-md">
								{copied ? "Copied!" : "Copy link"}
							</span>
						</span>
					</CopyToClipboard>
				</div>
			)}

			<div className="grid grid-cols-12 gap-x-3 mb-16">
				<Dropzone
					className="col-start-1 col-end-5  md:col-end-6 bg-gray-200 text-black rounded-full md:px-8 py-3 text-center"
					images={document && document.images}
					collection={collection}
				/>

				{selectedImages.length > 0 && (
					<div className="col-start-5 col-end-10 md:col-start-6 md:col-end-11 bg-gray-200 text-black text-center rounded-full md:px-8 py-3 ">
						<button onClick={() => setOpenCreateAlbum(true)}>
							Create new Album ({selectedImages.length})
						</button>
					</div>
				)}
			</div>

			{document && (
				<>
					{loading && <Loader />}
					<Grid>
						{document.images &&
							document.images.map((img, index) => (
								<Card
									select={() =>
										handleSelectedImages(
											img.url,
											img.name,
											img.path,
											img.size,
											img.type,
											index
										)
									}
									key={index}
									image={img}
								/>
							))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default AlbumModule;
