import { useState } from "react";

const FormInput = ({ label, type, name, value, onChange }) => {
	return (
		<div className="form-input">
			<label>{label}</label>
			<input type={type} value={value} name={name} onChange={onChange} />
		</div>
	);
};

export default FormInput;
