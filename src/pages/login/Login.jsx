import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Login = () => {
	const { login } = useAuthContext();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await login(email, password);
		} catch (e) {
			setError(e.message);
			console.log(e.message);
			console.log(email);
		}
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h2>Login</h2>
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
				<span>Your password</span>
				<input
					required
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>
			<button type="submit">Login</button>
			<p className="form-redirect">
				Don't have an account? <Link to="/signup">Signup</Link>{" "}
			</p>
		</form>
	);
};

export default Login;
