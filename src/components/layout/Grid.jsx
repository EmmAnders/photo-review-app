import { SRLWrapper } from "simple-react-lightbox";

const Grid = ({ children }) => {
	return (
		<SRLWrapper>
			<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 w-full">
				{children}
			</div>
		</SRLWrapper>
	);
};

export default Grid;
