import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = ({ items, title }) => {
	return (
		<ul className="dropdown">
			<p className="dropdown-title">{title}</p>
			{items.map((item, index) => (
				<li
					className="dropdown-item"
					key={index}
					onClick={item.onClick}
				>
					<FontAwesomeIcon
						className="icon"
						icon={item.icon}
					></FontAwesomeIcon>
					<p>{item.name}</p>
				</li>
			))}
		</ul>
	);
};

export default Dropdown;
