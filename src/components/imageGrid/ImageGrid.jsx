import { SRLWrapper } from "simple-react-lightbox";
import { useCollectionContext } from "../../contexts/CollectionContext";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
 */
import "./ImageGrid.scss";

const ImageGrid = (props) => {
	const { checkedImages, setCheckedImages } = useCollectionContext();

	const handleCheckedImages = (imageUrl, name, path, size, type) => {
		let newImage = {
			name: name,
			path: path,
			size: size,
			type: type,
			url: imageUrl,
		};

		const imageExist = checkedImages.find(
			(item) => item.url == newImage.url
		);

		if (imageExist) {
			let image = checkedImages.filter(
				(item) => item.url !== newImage.url
			);
			setCheckedImages(image);
		} else {
			setCheckedImages([newImage, ...checkedImages]);
		}
	};
	console.log(checkedImages);

	return (
		<>
			{props.loading && <p>Loading..</p>}
			{props.document && (
				<div className="image-grid">
					{props.document.images.map((img, index) => (
						<SRLWrapper>
							<div
								className="image-grid-items"
								onClick={() =>
									handleCheckedImages(
										img.url,
										img.name,
										img.path,
										img.size,
										img.type
									)
								}
								key={index}
							>
								<img src={img.url} />
							</div>
						</SRLWrapper>
					))}
				</div>
			)}
			;
		</>
	);
};

export default ImageGrid;
