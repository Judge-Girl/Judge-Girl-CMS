import * as React from "react";
import {useState} from "react";
import {createRef} from "react";
import {renderModal} from "../commons/modals/modal";
import {ModalHeader} from "../commons/titles/ModalHeader";
import {studentService} from "../../services/services";
import './CreateGroupModal.css';


const CreateGroupModal = ({show, onClose, onGroupCreated}) => {
    const [name, setName] = useState('');
    const closeIconRef = createRef(), formRef = createRef();

    const handleSubmit = e => {
        e.preventDefault();
        studentService.createGroupWithName(name)
            .then(group => {
                onGroupCreated(group);
                closeIconRef.current.click();
                setName("");
            });

    };

    return renderModal({
        modalClassName: "create-group-modal",
        modalWidth: "572px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="has-text-centered">
                    <ModalHeader title="Create New Group"/>
                    <input type="text" className="mt-4" value={name} onChange={e => setName(e.target.value)} required/>
                    <button className="button ml-2 mt-3 my-green-btn" id="create-btn">Create Group</button>
                </div>
            </form>
        )
    })
};


export {CreateGroupModal}
