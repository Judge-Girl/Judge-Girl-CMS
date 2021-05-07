import './TextareaModal.scss'
import React, {createRef, useState} from "react";
import {renderModal} from "./modal";
import {ModalHeader} from "./ModalHeader";

/**
 * @param title, the title (str) of the modal
 * @param body, the content of the modal. 5 fields
 *         (1) description (str) (2) Icon (Icon Component) (3) placeholder (str) (4) remark (str) (5) buttonName (str)
 * @param show, show the modal or not (boolean)
 * @param onClose, the callback function when close the modal
 * @param onSubmit, the callback function when submit the form
 */

const TextareaModal = ({title, body, show, onClose, onSubmit}) => {
    const closeIconRef = createRef(), formRef = createRef();
    const Icon = body.Icon;
    const [content, setContent] = useState();

    const handleSubmit = e => {
        onSubmit(content)
        closeIconRef.current.click()
        setContent('');
        e.preventDefault()
    };

    return renderModal({
        modalClassName: "textarea-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={e => handleSubmit(e)} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title}
                                 style={{ textAlign: "left"}}/>
                    <p className="description"><Icon className="modal-icon"/>{body.description}</p>
                    <textarea className="textarea"
                              value={content}
                              onChange={e => setContent(e.target.value)}
                              placeholder={body.placeholder}/>
                    <div className="columns">
                        <div className="column">
                            <p className="remark">{body.remark}</p>
                        </div>
                        <div className="column">
                            <button className="button mt-5" id="add-btn">{body.buttonName}</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    })
};

export {TextareaModal}