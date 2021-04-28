import './AddParticipantModal.scss'
import React, { createRef, useState } from "react";
import { renderModal } from "../../commons/modals/modal";
import { ModalHeader } from "../../commons/modals/ModalHeader";

const InputField = ({ id, type, labelText, value, placeholder, onChange }) => (
    <div>
        <label htmlFor={id}>{labelText}</label>
        <input id={id} type={type} onChange={onChange} value={value} placeholder={placeholder} />
    </div>
);

const AddProblemModal = ({ title, content, show, onClose, onSubmit }) => {
    const closeIconRef = createRef(), formRef = createRef();
    const [problemId, setProblemId] = useState('');
    const [scorePercentage, setScorePercentage] = useState('');
    const [submissionQuota, setSubmissionQuota] = useState('');

    const submit = () => onSubmit(problemId, scorePercentage, submissionQuota);

    return renderModal({
        modalClassName: "add-participant-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={e => submit()} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="left" />
                    <InputField id="input-problem-id" type="number" labelText="Problem Id" value={problemId} placeholder="1" onChange={e => setProblemId(e.target.value)} />
                    <InputField id="input-score-percentage" type="number" labelText="Score Percentage" value={scorePercentage} placeholder="100" onChange={e => setScorePercentage(e.target.value)} />
                    <InputField id="input-submission-quota" type="number" labelText="Submission Quota" value={submissionQuota} placeholder="999" onChange={e => setSubmissionQuota(e.target.value)} />
                    <div className="columns">
                        <div className="column">
                            <button className="button mt-5" id="add-btn">Create Question</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    })
};


export { AddProblemModal };