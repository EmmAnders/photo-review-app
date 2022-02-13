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
		<div className="login-page h-full  flex justify-center items-center ">
			<div class="w-1/2">
				<p>{error}</p>
				<Form
					onSubmit={handleSubmit}
					btnText="Login"
					btnClassCondition={form.email && form.password}
				>
					<FormInput
						label="Email"
						type="email"
						value={form.email}
						name="email"
						onChange={handleFormChange}
						classes="mb-4"
					/>
					<FormInput
						label="Password"
						type="password"
						name="password"
						value={form.password}
						onChange={handleFormChange}
						classes="mb-2"
					/>
				</Form>
				<p className="mt-2">
					Don't have an account?{" "}
					<Link className="underline" to="/signup">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
