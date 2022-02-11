const Form = ({
	onSubmit,
	children,
	btnClassCondition,
	btnTextCondition,
	btnText,
}) => {
	return (
		<form className="form" onSubmit={onSubmit} className="form">
			{children}
			<button
				className={`${
					btnClassCondition ? "primary-button" : "disabled-button"
				}`}
				type="submit"
			>
				{btnTextCondition ? "loading" : btnText}
			</button>
		</form>
	);
};

export default Form;
