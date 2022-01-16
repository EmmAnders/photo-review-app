import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Form, FormInput } from "../components/index";

const Signup = () => {
	const { signup } = useAuthContext();
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const [form, setForm] = useState({
		email: "",
		password: "",
		passwordConfirmation: "",
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		const updatedForm = { ...form, [name]: value };
		setForm(updatedForm);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.password !== form.passwordConfirmation) {
			return setError("Oh no! Your passwords don't match.");
		}

		setError(null);

		try {
			await signup(form.email, form.password);
			navigate("/");
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<div className="signup-page">
			<Form onSubmit={handleSubmit} cta="Create account">
				<FormInput
					label="email"
					type="email"
					value={form.email}
					name="email"
					onChange={handleFormChange}
				/>
				<FormInput
					label="password"
					type="password"
					name="password"
					value={form.password}
					onChange={handleFormChange}
				/>
				<FormInput
					label="password confirmation"
					type="password"
					name="passwordConfirmation"
					value={form.passwordConfirmation}
					onChange={handleFormChange}
				/>
			</Form>
			<p className="form-redirect">
				Already have an account? <Link to="/login">Login</Link>{" "}
			</p>
		</div>
	);
};

export default Signup;
