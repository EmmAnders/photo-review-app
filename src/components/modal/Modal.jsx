import "./Modal.scss";

const Modal = ({ close, title, body, footer }) => {
	return (
		<>
			<div onClick={close} className="modal-overlay"></div>
			<div className="modal">
				<div className="modal-header">
					<div>{title}</div>
					<div className="modal-header-close" onClick={close}>
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
