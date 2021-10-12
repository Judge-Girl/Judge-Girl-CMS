import React, {createRef, useEffect, useState} from 'react';
import {renderModal} from '../../commons/modals/modal';
import {ModalHeader} from '../../commons/modals/ModalHeader';
import './EditQuestionModal.scss';

const InputField = ({id, type, labelText, value, placeholder, onChange}) => (
	<div className="input-field">
		<label htmlFor={id}>{labelText}</label>
		<input id={id} type={type} onChange={onChange} value={value} placeholder={placeholder} required={true}/>
	</div>
);

const NoInputField = ({text}) => (
	<div className="input-field">
		<label>{text}</label>
	</div>
);


const EditQuestionModal = ({title, show, onClose, onSubmitQuestion, question}) => {
	const closeIconRef = createRef(), formRef = createRef();
	const [maxScore, setMaxScore] = useState(question?.maxScore);
	const [submissionQuota, setSubmissionQuota] = useState(question?.quota);

	const clearFields = () => {
		setMaxScore('');
		setSubmissionQuota('');
	};

	const handleFormSubmit = e => {
		e.preventDefault();
		const form = formRef.current;

		if (form.checkValidity()) {
			question.score = maxScore;
			question.quota = submissionQuota;
			onSubmitQuestion(question)
				.then(closeIconRef.current.click())
				.then(clearFields);
		} else {
			form.reportValidity();
		}
	};

	useEffect(() => {
		setMaxScore(question?.maxScore);
		setSubmissionQuota(question?.quota);
	}, [question]);

	return question ? renderModal({
		modalClassName: 'edit-problem-modal',
		modalWidth: '660px',
		show, onClose, closeIconRef,
		contentRendering: () => (
			<div className="edit-problem-modal">
				<form onSubmit={handleFormSubmit} ref={formRef}>
					<div id="modal" className="font-poppins has-text-centered">
						<ModalHeader className="header" title={title}
							style={{textAlign: 'left'}}/>
						<NoInputField text={'Problem: ' + question.problemId + ' ' + question.problemTitle}/>
						<InputField id="input-max-score" type="number" labelText="Max Score"
							value={maxScore} placeholder=""
							onChange={e => setMaxScore(e.target.value)}/>
						<InputField id="input-submission-quota" type="number" labelText="Submission Quota"
							value={submissionQuota} placeholder=""
							onChange={e => setSubmissionQuota(e.target.value)}/>
						<div className="submit-btn my-3 px-2">
							<button className="button" id="add-btn" type="submit">Edit Question</button>
						</div>
					</div>
				</form>
			</div>
		)
	}) : (<div/>);
};


export {EditQuestionModal};
