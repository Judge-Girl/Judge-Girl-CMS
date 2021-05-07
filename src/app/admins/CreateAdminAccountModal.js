import * as React from "react";
import {createRef, useState} from "react";
import {renderModal} from "../commons/modals/modal";
import {ModalHeader} from "../commons/modals/ModalHeader";
import {studentService} from "../../services/services";
import './CreateAdminAccountModal.css';
import {ModalInput} from "../commons/modals/ModalInput";


const CreateAdminAccountModal = ({show, onClose, onAdminCreated}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const closeIconRef = createRef(), formRef = createRef();

    const handleSubmit = e => {
        e.preventDefault();
        studentService.createAdminAccount({name, email, password})
            .then(student => {
                onAdminCreated(student);
                closeIconRef.current.click();

                setName("");
                setEmail("");
                setPassword("");
            });

    };

    // TODO: not sure if CreateAdminAccountModal will grow differently from CreateStudentAccountModal
    //      hence keep them individually for the while
    // noinspection DuplicatedCode
    return renderModal({
        modalClassName: "create-admin-account-modal",
        modalWidth: "530px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader title="Create Admin Account"
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
                    <button className="button mt-5 my-green-btn" id="create-btn">Create Admin Account</button>
                </div>
            </form>
        )
    })
};


export {CreateAdminAccountModal}
