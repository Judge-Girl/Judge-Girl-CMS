import './AddExamineesModal.scss'
import React, {createRef, useState} from "react";
import {renderModal} from "../../commons/modals/modal";
import {ModalHeader} from "../../commons/modals/ModalHeader";

const AddExamineesModal = ({title, content, show, onClose, onSubmit}) => {
    const closeIconRef = createRef(), formRef = createRef();
    const Icon = content.Icon;
    const [emails, setEmails] = useState();

    const handleSubmit = e => {
        onSubmit(emails)
        closeIconRef.current.click()
        setEmails('');
        e.preventDefault()
    };

    return renderModal({
        modalClassName: "add-examinees-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={e => handleSubmit(e)} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="left"/>
                    <p className="description"><Icon className="modal-icon"/>{content.description}</p>
                    <textarea className="textarea"
                              value={emails}
                              onChange={e => setEmails(e.target.value)}
                              placeholder={content.placeholder}/>
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


export {AddExamineesModal}