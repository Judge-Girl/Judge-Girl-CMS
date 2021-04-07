import './AddGroupModal.scss'
import React, {useState, createRef} from "react";
import {renderModal} from "../../commons/modals/modal";
import {ModalHeader} from "../../commons/modals/ModalHeader";
import {AiOutlineUsergroupAdd} from "react-icons/ai"

const AddGroupModal = ({show, onClose, onStudentCreated}) => {

    const closeIconRef = createRef(), formRef = createRef();

    const handleSubmit = e => {
        e.preventDefault();

    };

    return renderModal({
        modalClassName: "add-group-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title="Add Students By Groups" textAlign="left"/>
                    <p className="description"><AiOutlineUsergroupAdd className="modal-icon"/>Add groups to the exam with the groups’ name.</p>
                    <textarea className="textarea" placeholder="group-name-A &#10;group-name-B " />
                    <div className="columns">
                        <div className="column">
                            <p className="note">＊One group name per line.</p>
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


export {AddGroupModal}
