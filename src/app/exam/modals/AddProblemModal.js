import './AddParticipantModal.scss'
import React, { createRef, useState } from "react";
import { renderModal } from "../../commons/modals/modal";
import { ModalHeader } from "../../commons/modals/ModalHeader";

const outsideDivStyle = {
    padding: "20px 40px",
};

const inputGroupStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

};

const labelStyle = {
    margin: "5px 10px",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "30px",
};

const inputStyle = {
    margin: "5px 10px",
    flexGrow: "1",
    backgroundColor: "#F3F3F3",
    border: "1px solid #A2A3B1",
    boxSizing: "border-box",
    borderRadius: "10px",
};

const InputField = ({ id, type, labelText, value, placeholder, onChange }) => (
    <div style={inputGroupStyle}>
        <label htmlFor={id} style={labelStyle}>{labelText}</label>
        <input id={id} type={type} onChange={onChange} value={value} placeholder={placeholder} style={inputStyle} />
    </div>
);

const AddProblemModal = ({ title, show, onClose, onSubmit }) => {
    const closeIconRef = createRef(), formRef = createRef();
    const [problemId, setProblemId] = useState('');
    const [scorePercentage, setScorePercentage] = useState('');
    const [submissionQuota, setSubmissionQuota] = useState('');

    const submit = () => onSubmit(problemId, scorePercentage, submissionQuota);

    return renderModal({
        modalClassName: "add-problem-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <div style={outsideDivStyle}>
                    <div id="modal" className="font-poppins has-text-centered">
                        <ModalHeader className="header" title={title} textAlign="left" />
                        <InputField id="input-problem-id" type="number" labelText="Problem ID" value={problemId} placeholder="" onChange={e => setProblemId(e.target.value)} />
                        <InputField id="input-score-percentage" type="number" labelText="Score Percentage" value={scorePercentage} placeholder="" onChange={e => setScorePercentage(e.target.value)} />
                        <InputField id="input-submission-quota" type="number" labelText="Submission Quota" value={submissionQuota} placeholder="" onChange={e => setSubmissionQuota(e.target.value)} />
                        <div className="columns">
                            <div className="column">
                                <button className="button mt-5" id="add-btn" onClick={submit}>Create Question</button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    })
};


export { AddProblemModal };