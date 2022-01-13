import Masonry from "react-masonry-css";
import { SRLWrapper } from "simple-react-lightbox";

import "./MasonryGrid.scss";

const masonryBreakpoints = {
	default: 6,
	576: 3,
	768: 4,
	992: 5,
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
