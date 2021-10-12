import * as React from 'react';
import {createRef, useState} from 'react';
import {renderModal} from '../commons/modals/modal';
import {ModalHeader} from '../commons/modals/ModalHeader';
import {studentService} from '../../services/services';
import './CreateGroupModal.scss';
import {ModalInput} from '../commons/modals/ModalInput';


const CreateGroupModal = ({show, onModalClose, onGroupCreated}) => {
	const [name, setName] = useState('');
	const [duplicateGroup, setDuplicateGroup] = useState(false);
	const closeIconRef = createRef(), formRef = createRef();

	const handleSubmit = e => {
		e.preventDefault();
		studentService.createGroupWithName(name)
			.then(group => {
				closeIconRef.current.click();
				onGroupCreated(group);
			})
			.catch(() => setDuplicateGroup(true));
	};

	const onClose = () => {
		onModalClose();
		setName('');
		setDuplicateGroup(false);
	};

	return renderModal({
		modalClassName: 'create-group-modal',
		modalWidth: '572px',
		show, onClose, closeIconRef,
		contentRendering: () => (
			<form onSubmit={handleSubmit} ref={formRef}>
				<div id="modal" className="p-5 has-text-centered">
					<ModalHeader title="Create New Group"
						style={{
							textAlign: 'center'
						}}/>
					<ModalInput type="text" value={name}
						placeholder="Group Name" placeholderTextAlign="center"
						height="54px" fontSize="25px"
						onChange={e => setName(e.target.value)} required={true}/>
					{duplicateGroup ? <p className="error-msg">＊ Group name has already existed</p>: ''}
					<button className={`button ${duplicateGroup ? 'is-error': ''}`} id="create-btn">Create</button>
				</div>
			</form>
		)
	});
};


export {CreateGroupModal};
