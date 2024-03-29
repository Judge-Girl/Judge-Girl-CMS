import * as React from 'react';
import {createRef, useState} from 'react';
import {problemService} from '../../../services/services';
import {renderModal} from '../../commons/modals/modal';
import {ModalInput} from '../../commons/modals/ModalInput';
import {ModalHeader} from '../../commons/modals/ModalHeader';


const CreateProblemModal = ({show, onClose, onProblemCreated}) => {
  const [problemName, setName] = useState();
  const closeIconRef = createRef(), formRef = createRef(), nameInputRef = createRef();

  const handleSubmit = e => {
    e.preventDefault();
    const form = formRef.current;

    if (form.checkValidity()) {
      problemService.createProblem(problemName)
        .then(problem => onProblemCreated(problem));
      setName(null);
      closeIconRef.current.click();
    } else {
      form.reportValidity();
    }

  };

  return renderModal({
    modalClassName: 'create-problem-modal',
    modalWidth: '465px',
    show, onClose, closeIconRef,
    contentRendering: () => (
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="p-5 has-text-centered">
          <ModalHeader title="Create New Problem"
            style={{textAlign: 'center'}}/>
          <ModalInput ref={nameInputRef}
            value={problemName} required
            fontSize="20px" height="41px"
            placeholder="New Problem Title"
            onChange={e => setName(e.target.value)}/>
          <button className="button ml-2 mt-3 my-green-btn" id="create-btn">Create</button>
        </div>
      </form>
    )
  });
};

export default CreateProblemModal;
