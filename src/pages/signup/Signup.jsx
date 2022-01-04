import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Signup = () => {
	const { signup } = useAuthContext();
	const navigate = useNavigate();

	const [error, setError] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== passwordConfirmation) {
			return setError("The Passwords doesn't match");
		}
		setError(null);
		try {
			await signup(email, password);
		} catch (e) {
			setError(e.message);
		}

		console.log(email, password, passwordConfirmation);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Sign up</h2>
			<h2>{error}</h2>
			<label>
				<span>Email:</span>
				<input
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					required
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>

			<label>
				<span>Password Confirmation:</span>
				<input
					required
					type="password"
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					value={passwordConfirmation}
				/>
			</label>

			<input type="submit" value="Submit" />
		</form>
	);
};

export default Signup;
