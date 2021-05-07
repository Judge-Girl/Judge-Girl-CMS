import React, {createRef} from "react";
import {renderModal} from "../../commons/modals/modal";
import {ModalHeader} from "../../commons/modals/ModalHeader";
import "./RejudgeProblemModal.scss"


const RejudgeProblemModal = ({title, show, problemId, problemTitle, onClose, rejudgeProblemId, onConfirmRejudge }) => {
    const closeIconRef = createRef(),
          formRef = createRef();

    const handleFormSubmit = e => {
        e.preventDefault();
        const form = formRef.current;

        if (form.checkValidity()) {
            onConfirmRejudge(problemId)
        } else {
            form.reportValidity();
        }
    };

    return renderModal({
        modalClassName: "rejudge-problem-modal",
        modalWidth: "600px",
        show: show === problemId,
        onClose, closeIconRef,
        contentRendering: () => (
            <div className="rejudge-problem-modal">
                <form onSubmit={handleFormSubmit} ref={formRef}>
                    <div id="modal" className="font-poppins">
                        <div className="mx-5 mt-2">
                            <ModalHeader title={title} style={{textAlign: "left", color: "#FF8C00"}} />
                        </div>
                        <div className="py-3" style={{ background: "#F5F5DC", fontSize: "21px" }}>
                            All the submissions under this problem will be rejudged.
                        </div>
                        <div className="mx-6 my-5" style={{ fontSize: "20px", textAlign: "left" }}>
                            Problem Title: <h3>{problemId} {problemTitle}</h3>
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
    })
};


export { RejudgeProblemModal };