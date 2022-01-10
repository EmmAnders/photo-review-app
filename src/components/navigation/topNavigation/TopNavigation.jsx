import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

import "./TopNavigation.scss";

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
			<div className="logo">
				<Link to="/albums">LOGO</Link>
			</div>
			{user ? (
				<div onClick={handleLogout}>Logout</div>
			) : (
				<div>
					<Link to="/login">Login</Link>
				</div>
			)}
		</>
	);
};

export default TopNavigation;
