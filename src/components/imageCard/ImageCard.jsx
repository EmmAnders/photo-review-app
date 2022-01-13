import "./ImageCard.scss";

const ImageCard = ({ select, image, activeClass }) => {
	return (
		<div className={`image-card ${activeClass}`}>
			<label className="checkbox">
				<input type="checkbox" className="checkbox-input" />
				<span onClick={select} className="checkbox-circle"></span>
			</label>

			<div className="image-card-content">
				<div className="img-wrapper">
					<img className="img" src={image.url} />
				</div>
				<p>{image.name}</p>
			</div>
		</div>
	);
};

export default ImageCard;
