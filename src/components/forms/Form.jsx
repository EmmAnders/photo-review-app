const Form = ({ onSubmit, inputFields }) => {
	return (
		<>
			<h1>Dynamic Form Fields in React</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-row">
					{inputFields.map((inputField, index) => (
						<Fragment key={`${inputField}~${index}`}>
							<div className="form-group">
								<label htmlFor={inputField.id}>
									First Name
								</label>
								<input
									onChange={(event) =>
										handleInputChange(index, event)
									}
									type="text"
									className="form-control"
									id={inputField.id}
									name={inputField.name}
									value={inputField.name}
								/>
							</div>
						</Fragment>
					))}
				</div>
				<div className="submit-button">
					<button className="btn btn-primary" type="submit">
						Save
					</button>
				</div>
			</form>
		</>
	);
};

export default Form;
