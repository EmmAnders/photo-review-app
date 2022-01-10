import Masonry from "react-masonry-css";
import { SRLWrapper } from "simple-react-lightbox";

//Context imports
import { useCollectionContext } from "../../contexts/CollectionContext";

/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
 */
import "./ImageGrid.scss";

const masonryBreakpoints = {
	default: 4,
	576: 3,
	768: 4,
	992: 5,
};

const ImageGrid = (props) => {
	const { handleSelectedImages } = useCollectionContext();
	return (
		<>
			{props.loading && <p>Loading..</p>}
			{props.document && (
				<SRLWrapper>
					<Masonry
						breakpointCols={masonryBreakpoints}
						className="masonry-grid"
						columnClassName="masonry-grid_column"
					>
						{props.document.images.map((img, index) => (
							<div
								key={index}
								onClick={() =>
									handleSelectedImages(
										img.url,
										img.name,
										img.path,
										img.size,
										img.type
									)
								}
							>
								<img src={img.url} />
								<div>{props.icons}</div>
							</div>
						))}
					</Masonry>
				</SRLWrapper>
			)}
			;
		</>
	);
};

export default ImageGrid;
