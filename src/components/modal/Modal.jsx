import "./Modal.scss";

const Modal = (props) => {
	return (
		<>
			<div onClick={props.close} className="modal-overlay"></div>
			<div className="modal">
				<div className="modal-header">
					<div>{props.title}</div>
					<div onClick={props.close}>X</div>
				</div>
				<div className="modal-body">{props.body}</div>
				<div className="modal-footer">{props.footer}</div>
			</div>
		</>
	);
};

export default Modal;
