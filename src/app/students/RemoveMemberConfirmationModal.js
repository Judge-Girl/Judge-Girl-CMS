import './RemoveMemberConfirmationModal.scss'
import React, {createRef} from "react";
import {renderModal} from "../commons/modals/modal";
import {ModalHeader} from "../commons/modals/ModalHeader";

/**
 * @param title, the title (str) of the modal
 * @param data, the content of the modal. 2 fields
 *         (1) title (str) (2) value (str)
 * @param show, show the modal or not (boolean)
 * @param onClose, the callback function when close the modal
 */

const RemoveMemberConfirmationModal = function ({title, show, onClose, data, onSubmit}) {
    const closeIconRef = createRef(), formRef = createRef();

    return renderModal({
        modalClassName: "remove-confirmation-modal",
        modalWidth: "480px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={onSubmit} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="center"/>
                    {
                        data?.map(item =>
                            <p key={item.title}>{item.title}: {item.value}</p>
                        )
                    }
                    <button className="button mt-5" id="remove-btn">Remove</button>
                </div>
            </form>
        )
    })
};

export {RemoveMemberConfirmationModal}