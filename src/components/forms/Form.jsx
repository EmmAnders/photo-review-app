const Form = ({
	onSubmit,
	children,
	btnClassCondition,
	btnTextCondition,
	btnText,
}) => {
	return (
		<form onSubmit={onSubmit}>
			{children}
			<button
				className={`${
					btnClassCondition ? "opacity-100  w-full " : ""
				} bg-black text-white rounded-full w-full opacity-20  mt-4 py-2 `}
				type="submit"
			>
				{btnTextCondition ? "loading" : btnText}
			</button>
		</form>
	);
};

export default Form;
