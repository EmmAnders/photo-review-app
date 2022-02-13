import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = ({ items, title }) => {
	return (
		<ul className="absolute top-full rounded right-0 bg-white border border-neutral-300  z-20">
			<p className="dropdown-title px-4 py-2 border-b border-neutral-300">
				{title}
			</p>
			{items.map((item, index) => (
				<li
					className="flex items-center px-4 py-2 border-b border-neutral-300 "
					key={index}
					onClick={item.onClick}
				>
					<FontAwesomeIcon
						className="mr-1 h-3"
						icon={item.icon}
					></FontAwesomeIcon>
					<p className="text-sm">{item.name}</p>
				</li>
			))}
		</ul>
	);
};

export default Dropdown;
