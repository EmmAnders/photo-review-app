import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Form, FormInput } from "../components/index";

const Login = () => {
	const { login } = useAuthContext();
	const [error, setError] = useState(null);

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		const updatedForm = { ...form, [name]: value };
		setForm(updatedForm);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await login(form.email, form.password);
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<div className="login-page">
			<p>{error}</p>
			<Form onSubmit={handleSubmit} cta="login">
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
			</Form>
			<p className="form-redirect">
				Don't have an account? <Link to="/signup">Sign up</Link>
			</p>
		</div>
	);
};

export default Login;
