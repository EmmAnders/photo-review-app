import { useNavigate, NavLink } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

import "./SideNavigation.scss";

const SideNavigation = () => {
	const { user } = useAuthContext();
	return (
		<>
			{user && (
				<ul className="site-sidebar">
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive ? "active" : ""
							}
							to="/"
						>
							Collections
						</NavLink>
					</li>
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive ? "active" : ""
							}
							to="/reviewed-collections"
						>
							Reviewed Collections
						</NavLink>
					</li>
				</ul>
			)}
		</>
	);
};

export default SideNavigation;
