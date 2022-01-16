import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Signup = () => {
	const { signup, setUser, user } = useAuthContext();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== passwordConfirmation) {
			return setError("Oh no! Your passwords don't match.");
		}

		setError(null);

		try {
			await signup(email, password);
			navigate("/");
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<form
			className="form"
			style={{ width: "50%", margin: "0 auto" }}
			onSubmit={handleSubmit}
		>
			<h2>Signup</h2>
			<p>{error}</p>
			<label>
				<span>Email</span>
				<input
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Pick a password</span>
				<input
					required
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>

			<label>
				<span>Password Confirmation</span>
				<input
					required
					type="password"
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					value={passwordConfirmation}
				/>
			</label>
			<button className="primary-button" type="submit">
				Signup
			</button>
			<p className="form-redirect">
				Already have an account? <Link to="/login">Log In</Link>{" "}
			</p>
		</form>
	);
};

export default Signup;
