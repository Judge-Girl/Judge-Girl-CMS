import './AddProblemModal.scss'
import React, { createRef, useState } from "react";
import { renderModal } from "../../commons/modals/modal";
import { ModalHeader } from "../../commons/modals/ModalHeader";

const InputField = ({ id, type, labelText, value, placeholder, onChange }) => (
    <div className="input-field">
        <label htmlFor={id}>{labelText}</label>
        <input id={id} type={type} onChange={onChange} value={value} placeholder={placeholder} />
    </div>
);

const AddProblemModal = ({ title, show, onClose, onSubmit }) => {
    const closeIconRef = createRef();
    const [problemId, setProblemId] = useState('');
    const [scorePercentage, setScorePercentage] = useState('');
    const [submissionQuota, setSubmissionQuota] = useState('');

    const submit = () => {
        if (!problemId || !scorePercentage || !submissionQuota) return;

        onSubmit(problemId, scorePercentage, submissionQuota);

        setProblemId('');
        setScorePercentage('');
        setSubmissionQuota('');
    };

    const enterSubmit = e => {
        if (e.keyCode === 13) submit();
    };

    return renderModal({
        modalClassName: "add-problem-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <div className="add-problem-modal" onKeyUp={enterSubmit}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="left" />
                    <InputField id="input-problem-id" type="number" labelText="Problem ID" value={problemId} placeholder="" onChange={e => setProblemId(e.target.value)} />
                    <InputField id="input-score-percentage" type="number" labelText="Score Percentage" value={scorePercentage} placeholder="" onChange={e => setScorePercentage(e.target.value)} />
                    <InputField id="input-submission-quota" type="number" labelText="Submission Quota" value={submissionQuota} placeholder="" onChange={e => setSubmissionQuota(e.target.value)} />
                    <div className="submit-btn my-3 px-2">
                        <button className="button" id="add-btn" onClick={submit}>Create Question</button>
                    </div>
                </div>
            </div>
        )
    })
};


export { AddProblemModal };