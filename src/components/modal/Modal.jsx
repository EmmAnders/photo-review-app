import "./Modal.scss";

const Modal = (props) => {
	return (
		<>
			<div onClick={props.close} className="modal-overlay"></div>
			<div className="modal">
				<div className="modal-header">
					<div>{props.title}</div>
					<div className="modal-header-close" onClick={props.close}>
						Close
					</div>
				</div>
				<div className="modal-body">{props.body}</div>
				<div className="modal-footer">{props.footer}</div>
			</div>
		</>
	);
};

export default Modal;
