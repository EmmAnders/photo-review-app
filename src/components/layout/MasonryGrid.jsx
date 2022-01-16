import Masonry from "react-masonry-css";
import { SRLWrapper } from "simple-react-lightbox";

const masonryBreakpoints = {
	default: 8,
	576: 3,
	768: 4,
	992: 9,
};

const MasonryGrid = ({ children }) => {
	return (
		<>
			<SRLWrapper>
				<Masonry
					breakpointCols={masonryBreakpoints}
					className="masonry-grid"
					columnClassName="masonry-grid_column"
				>
					{children}
				</Masonry>
			</SRLWrapper>
			;
		</>
	);
};

export default MasonryGrid;
