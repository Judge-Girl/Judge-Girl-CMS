import React, {createRef} from 'react';
import {renderModal} from '../../commons/modals/modal';
import {ModalHeader} from '../../commons/modals/ModalHeader';
import './RejudgeQuestionModal.scss';


const RejudgeQuestionModal = ({show, title, question, onClose, onConfirmRejudge}) => {
	const closeIconRef = createRef(),
		formRef = createRef();

	const handleFormSubmit = e => {
		e.preventDefault();
		const form = formRef.current;

		if (form.checkValidity()) {
			onConfirmRejudge(question.problemId);
			onClose();
		} else {
			form.reportValidity();
		}
	};

	return renderModal({
		modalClassName: 'rejudge-problem-modal',
		modalWidth: '620px',
		show: show,
		onClose, closeIconRef,
		contentRendering: () => (
			<div className="rejudge-problem-modal">
				<form onSubmit={handleFormSubmit} ref={formRef}>
					<div id="modal" className="font-poppins">
						<div className="modal-header mt-2">
							<ModalHeader title={title}/>
						</div>
						<div className="rejudge-message py-3">
                            All the submissions under this problem will be rejudged.
						</div>
						<div className="placeholder mx-6 my-3">
							<h1>Problem Title: <span
								className="data my-1">{question.problemId} {question.problemTitle}</span></h1>
						</div>
						<div className="submit-btn mx-5">
							<button className="button" id="add-btn" type="submit">
                                Rejudge
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	});
};


export {RejudgeQuestionModal};
