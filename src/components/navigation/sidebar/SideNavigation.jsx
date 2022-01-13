import { useNavigate, NavLink } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useCollectionContext } from "../../../contexts/CollectionContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Component imports
import { Modal, AlbumForm } from "../../index";

import "./SideNavigation.scss";

const SideNavigation = () => {
	const { user } = useAuthContext();
	const { openModal, setOpenModal } = useCollectionContext();
	return (
		<>
			{user && (
				<ul className="site-sidebar">
					<li className="site-sidebar-create-btn">
						<button onClick={() => setOpenModal(true)}>
							<FontAwesomeIcon
								className="site-sidebar-create-btn-plus-icon"
								icon={faPlus}
							></FontAwesomeIcon>
							New Album
						</button>
					</li>
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive ? "active" : ""
							}
							to="/albums"
						>
							Albums
						</NavLink>
					</li>
					<li>
						<NavLink
							className={(navData) =>
								navData.isActive ? "active" : ""
							}
							to="/reviewed-albums"
						>
							User Picks
						</NavLink>
					</li>
				</ul>
			)}

			{openModal && (
				<>
					<Modal
						title="Create Album"
						body={<AlbumForm />}
						close={() => setOpenModal(false)}
					/>
				</>
			)}
		</>
	);
};

export default SideNavigation;
