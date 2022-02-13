const Modal = ({ close, title, body, footer }) => {
	return (
		<>
			<div
				onClick={close}
				className="z-20 bg-black opacity-20 fixed left-0 right-0 top-0 bottom-0"
			></div>
			<div className="z-30 w-3/12  modal py-8 px-8 bg-white border border-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
				<div className="modal-header flex justify-between mb-8">
					<div>{title}</div>
					<div
						className="modal-header-close cursor-pointer"
						onClick={close}
					>
						Close
					</div>
				</div>
				<div className="modal-body">{body}</div>
				<div className="modal-footer">{footer}</div>
			</div>
		</>
	);
};

export default Modal;
