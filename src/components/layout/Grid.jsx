import { SRLWrapper } from "simple-react-lightbox";

const Grid = ({ children }) => {
	return (
		<SRLWrapper>
			<div className="grid-container">{children}</div>
		</SRLWrapper>
	);
};

export default Grid;
