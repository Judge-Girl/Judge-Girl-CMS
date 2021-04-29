import './TextareaModal.scss'
import React, {createRef, useState} from "react";
import {renderModal} from "./modal";
import {ModalHeader} from "./ModalHeader";

const TextareaModal = ({title, content, show, onClose, onSubmit}) => {
    const closeIconRef = createRef(), formRef = createRef();
    const Icon = content.Icon;
    const [input, setInput] = useState();

    const handleSubmit = e => {
        onSubmit(input)
        closeIconRef.current.click()
        setInput('');
        e.preventDefault()
    };

    return renderModal({
        modalClassName: "textarea-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={e => handleSubmit(e)} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title} textAlign="left"/>
                    <p className="description"><Icon className="modal-icon"/>{content.description}</p>
                    <textarea className="textarea"
                              value={input}
                              onChange={e => setInput(e.target.value)}
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

export {TextareaModal}