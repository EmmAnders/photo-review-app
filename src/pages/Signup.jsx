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
		<div className="signup-page w-full flex justify-center items-center">
			<div className="w-1/2">
				<Form
					onSubmit={handleSubmit}
					btnText="Signup"
					btnClassCondition={
						form.email && form.password && form.passwordConfirmation
					}
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
						classes="mb-4"
					/>
					<FormInput
						label="password confirmation"
						type="password"
						name="passwordConfirmation"
						value={form.passwordConfirmation}
						onChange={handleFormChange}
						classes="mb-2"
					/>
				</Form>
				<p className="mt-2">
					Already have an account?{" "}
					<Link className="underline" to="/login">
						Login
					</Link>{" "}
				</p>
			</div>
		</div>
	);
};

export default Signup;
