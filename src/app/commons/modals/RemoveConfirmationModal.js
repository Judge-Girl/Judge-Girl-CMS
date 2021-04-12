import './RemoveConfirmationModal.scss'
import React, {createRef} from "react";
import {renderModal} from "./modal";
import {ModalHeader} from "./ModalHeader";

const RemoveConfirmationModal = ({title, content, show, onClose}) => {
    const closeIconRef = createRef(), formRef = createRef();

    const handleSubmit = e => {
        e.preventDefault();
    };

    return renderModal({
        modalClassName: "remove-confirmation-modal",
        modalWidth: "480px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="center"/>
                    {
                        content?.map(item =>
                            <p>{item.title}: {item.value}</p>
                        )
                    }
                    <button className="button mt-5" id="remove-btn">Remove</button>
                </div>
            </form>
        )
    })
};


export {RemoveConfirmationModal}