import React, { createRef, useState } from "react";
import { renderModal } from "../../commons/modals/modal";
import { ModalHeader } from "../../commons/modals/ModalHeader";
import Question from "../../../models/Question";
import './AddQuestionModal.scss'

const InputField = ({ id, type, labelText, value, placeholder, onChange }) => (
    <div className="input-field">
        <label htmlFor={id}>{labelText}</label>
        <input id={id} type={type} onChange={onChange} value={value} placeholder={placeholder} required={true} />
    </div>
);

const AddQuestionModal = ({ title, show, onClose, onSubmitQuestion }) => {
    const closeIconRef = createRef(), formRef = createRef();
    const [problemId, setProblemId] = useState('');
    const [scorePercentage, setScorePercentage] = useState('');
    const [submissionQuota, setSubmissionQuota] = useState('');

    const clearFields = () => {
        setProblemId('');
        setScorePercentage('');
        setSubmissionQuota('');
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        const form = formRef.current;

        if (form.checkValidity()) {
            const question = new Question({
                problemId,
                score: scorePercentage,
                quota: submissionQuota
            });
            onSubmitQuestion(question).then(clearFields);
        } else {
            form.reportValidity();
        }
    };

    return renderModal({
        modalClassName: "add-problem-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <div className="add-problem-modal">
                <form onSubmit={handleFormSubmit} ref={formRef}>
                    <div id="modal" className="font-poppins has-text-centered">
                        <ModalHeader className="header" title={title} style={{ textAlign: "left"}} />
                        <InputField labelText="Problem ID"
                                    type="number" id="input-problem-id" value={problemId}
                                    onChange={e => setProblemId(e.target.value)} />
                        <InputField labelText="Score Percentage"
                                    type="number" id="input-score-percentage" value={scorePercentage}
                                    onChange={e => setScorePercentage(e.target.value)} />
                        <InputField labelText="Submission Quota"
                                    type="number" id="input-submission-quota" value={submissionQuota}
                                    onChange={e => setSubmissionQuota(e.target.value)} />
                        <div className="submit-btn my-3 px-2">
                            <button className="button" id="add-btn" type="submit">Create Question</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    })
};


export { AddQuestionModal };