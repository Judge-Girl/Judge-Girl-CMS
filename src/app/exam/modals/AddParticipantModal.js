import './AddParticipantModal.scss'
import React, {createRef} from "react";
import {renderModal} from "../../commons/modals/modal";
import {ModalHeader} from "../../commons/modals/ModalHeader";

const AddParticipantModal = ({title, content, show, onClose, addParticipants}) => {
    const closeIconRef = createRef(), formRef = createRef();
    const Icon = content.Icon;

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e)
        addParticipants(e.target.value);
    };

    return renderModal({
        modalClassName: "add-participant-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={e=>addParticipants(e.target.value)} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="left"/>
                    <p className="description"><Icon className="modal-icon"/>{content.description}</p>
                    <textarea className="textarea" placeholder={content.placeholder}/>
                    <div className="columns">
                        <div className="column">
                            <p className="remark">{content.remark}</p>
                        </div>
                        <div className="column">
                            <button className="button mt-5" id="add-btn">Add</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    })
};


export {AddParticipantModal}