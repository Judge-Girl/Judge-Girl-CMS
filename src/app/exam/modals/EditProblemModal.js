import './EditProblemModal.scss'
import React, { createRef, useEffect, useState } from "react";
import { renderModal } from "../../commons/modals/modal";
import { ModalHeader } from "../../commons/modals/ModalHeader";

const InputField = ({ id, type, labelText, value, placeholder, onChange }) => (
    <div className="input-field">
        <label htmlFor={id}>{labelText}</label>
        <input id={id} type={type} onChange={onChange} value={value} placeholder={placeholder} required={true} />
    </div>
);

const NoInputField = ({ text }) => (
    <div className="input-field">
        <label>{text}</label>
    </div>
);

const EditProblemModal = ({ title, show, onClose, onSubmitQuestion, question }) => {
    const closeIconRef = createRef(), formRef = createRef();
    const [scorePercentage, setScorePercentage] = useState(question?.maxScore);
    const [submissionQuota, setSubmissionQuota] = useState(question?.quota);

    const handleFormSubmit = e => {
        e.preventDefault();
        const form = formRef.current;

        if (form.checkValidity()) {
            // const question = new Question({ problemId, score: scorePercentage, quota: submissionQuota });
            // onSubmitQuestion(question).then(clearFields);
        } else {
            form.reportValidity();
        }
    };

    useEffect(() => {
        setScorePercentage(question?.maxScore);
        setSubmissionQuota(question?.quota);
    }, [question])

    return question ? renderModal({
        modalClassName: "edit-problem-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <div className="edit-problem-modal">
                <form onSubmit={handleFormSubmit} ref={formRef}>
                    <div id="modal" className="font-poppins has-text-centered">
                        <ModalHeader className="header" title={title} textAlign="left" />
                        <NoInputField text={"Problem: " + question.problemId + " " + question.problemTitle} />
                        <InputField id="input-score-percentage" type="number" labelText="Score Percentage" value={scorePercentage} placeholder="" onChange={e => setScorePercentage(e.target.value)} />
                        <InputField id="input-submission-quota" type="number" labelText="Submission Quota" value={submissionQuota} placeholder="" onChange={e => setSubmissionQuota(e.target.value)} />
                        <div className="submit-btn my-3 px-2">
                            <button className="button" id="add-btn" type="submit">Edit Question</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }) : (<div></div>);
};


export { EditProblemModal };