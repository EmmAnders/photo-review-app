const Form = ({ onSubmit, cta, children }) => {
	return (
		<form className="form" onSubmit={onSubmit} className="form">
			{children}
			<button className="primary-button" type="submit">
				{cta}
			</button>
		</form>
	);
};

export default Form;
