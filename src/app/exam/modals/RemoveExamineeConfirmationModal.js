import './RemoveExamineeConfirmationModal.scss'
import React, {createRef} from "react";
import {renderModal} from "../../commons/modals/modal";
import {ModalHeader} from "../../commons/modals/ModalHeader";

const RemoveExamineeConfirmationModal = ({title, content, show, onClose}) => {
    const closeIconRef = createRef(), formRef = createRef();

    const handleSubmit = e => {
        e.preventDefault();
    };

    return renderModal({
        modalClassName: "remove-examinee-confirmation-modal",
        modalWidth: "480px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="center"/>
                    <p>Name: {content.name}</p>
                    <p>Email: {content.email}</p>
                    <button className="button mt-5" id="remove-btn">Remove</button>
                </div>
            </form>
        )
    })
};


export {RemoveExamineeConfirmationModal}