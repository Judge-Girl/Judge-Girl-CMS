import './AddStudentModal.css'
import React, {useState, createRef} from "react";
import {studentService} from "../../services/services";
import {renderModal} from "../commons/modals/modal";
import {ModalHeader} from "../commons/modals/ModalHeader";
import {AiOutlineMail} from "react-icons/ai"

const AddStudentModal = ({show, onClose, onStudentCreated}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const closeIconRef = createRef(), formRef = createRef();

    const handleSubmit = e => {
        e.preventDefault();
        studentService.createStudentAccount({name, email, password})
            .then(student => {
                onStudentCreated(student);
                closeIconRef.current.click();

                setName("");  // reset form
                setEmail("");
                setPassword("");
            });

    };

    return renderModal({
        modalClassName: "add-student-modal",
        modalWidth: "660px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title="Add Students" textAlign="left"/>
                    <p className="description"><AiOutlineMail className="modal-icon"/>Add students to the exam with the students’ email.</p>
                    <textarea className="textarea" placeholder="studentA@example.com &#10;studentB@example.com" />
                    <div className="columns">
                        <div className="column">
                            <p className="note">＊One email per line.</p>
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


export {AddStudentModal}
