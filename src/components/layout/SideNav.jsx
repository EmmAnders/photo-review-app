import { useNavigate, NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCollectionContext } from "../../contexts/CollectionContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Component imports
import { Modal, CreateAlbumForm, Form, FormInput } from "../index";

const SideNavigation = () => {
	const { user } = useAuthContext();
	const { setOpenCreateAlbum } = useCollectionContext();

	return (
		<>
			{user && (
				<ul className="flex justify-between items-center md:items-start mb-8 md:mb-0 md:flex-col ">
					<li className="fixed bottom-2 left-2 right-2 md:static z-20 ">
						<button
							className="w-full bg-black text-white rounded-full px-8 py-3 "
							onClick={() => setOpenCreateAlbum(true)}
						>
							<FontAwesomeIcon
								className="text-white mr-2"
								icon={faPlus}
							></FontAwesomeIcon>
							New Album
						</button>
					</li>
					<li className="md:pt-8 md:pb-4 ">
						<NavLink
							className={(navData) =>
								navData.isActive ? "text-neutral-500" : ""
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
							Reviewed Albums
						</NavLink>
					</li>
				</ul>
			)}
		</>
	);
};

export default SideNavigation;
