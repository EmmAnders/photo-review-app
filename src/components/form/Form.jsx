const Form = ({ onSubmit, children, btnClassCondition, btnTextCondition }) => {
	return (
		<form className="form" onSubmit={onSubmit} className="form">
			{children}
			<button
				className={`${
					btnClassCondition ? "primary-button" : "disabled-button"
				}`}
				type="submit"
			>
				{btnTextCondition ? "loading" : "Change name"}
			</button>
		</form>
	);
};

export default Form;
