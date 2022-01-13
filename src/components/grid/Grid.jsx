import { SRLWrapper } from "simple-react-lightbox";

import "./Grid.scss";

const Grid = ({ children }) => {
	return (
		<SRLWrapper>
			<div className="grid-container">{children}</div>
		</SRLWrapper>
	);
};

export default Grid;
