const ImageCard = ({ select, image, activeClass }) => {
	return (
		<div className="relative h-full flex  items-stretch flex-col">
			<div className="h-20">
				<img
					className="h-full w-full bg-center bg-cover"
					src={image.url}
				/>
				<label className="absolute top-1 left-1 ">
					<input
						onClick={select}
						type="checkbox"
						className="checkbox-input"
					/>
					<span onClick={select} className="checkbox-circle"></span>
				</label>
			</div>

			<div className="">
				<p className="text-xs pt-2">{image.name}</p>
			</div>
		</div>
	);
};

export default ImageCard;
