import { useState } from "react";

const FormInput = ({ label, type, name, value, onChange }) => {
	return (
		<div className="flex flex-col">
			<label className="text-sm mb-2">{label}</label>
			<input
				className="border border-neutral-400 rounded px-2"
				type={type}
				value={value}
				name={name}
				onChange={onChange}
			/>
		</div>
	);
};

export default FormInput;
