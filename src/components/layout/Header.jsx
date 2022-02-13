import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const TopNavigation = () => {
	const { logout, user } = useAuthContext();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<>
			<div className="text-2xl">
				<Link to="/albums">Photo Review</Link>
			</div>
			{user ? (
				<div className="uppercase" onClick={handleLogout}>
					Logout
				</div>
			) : (
				<div className="uppercase">
					<Link to="/login">Login</Link>
				</div>
			)}
		</>
	);
};

export default TopNavigation;
