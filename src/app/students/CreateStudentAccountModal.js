import * as React from "react";
import {createRef, useState} from "react";
import {renderModal} from "../commons/modals/modal";
import {ModalHeader} from "../commons/modals/ModalHeader";
import {studentService} from "../../services/services";
import './CreateStudentAccountModal.css';
import {ModalInput} from "../commons/modals/ModalInput";


const CreateStudentAccountModal = ({show, onClose, onStudentCreated}) => {
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
        modalClassName: "create-student-account-modal",
        modalWidth: "530px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader title="Create Student Account"
                                 style={{ textAlign: "left" }}/>
                    <ModalInput labelText="Name" value={name} required={true} height="50px"
                                placeholder="Name" placeholderTextAlign="left" fontSize="20px"
                                onChange={e => setName(e.target.value)}/>
                    <ModalInput type="email" labelText="Email" value={email} required={true} height="50px"
                                placeholder="student@example.com" placeholderTextAlign="left" fontSize="20px"
                                onChange={e => setEmail(e.target.value)}/>
                    <ModalInput type="password" labelText="Password" value={password} required={true} height="50px"
                                placeholder="Password" placeholderTextAlign="left" fontSize="20px"
                                onChange={e => setPassword(e.target.value)}/>
                    <button className="button mt-5 my-green-btn" id="create-btn">Create Student Account</button>
                </div>
            </form>
        )
    })
};


export {CreateStudentAccountModal}
