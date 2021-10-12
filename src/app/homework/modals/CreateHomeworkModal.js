import * as React from 'react';
import '../../commons/modals/TextareaModal.scss';
import {createRef, useState} from 'react';
import {renderModal} from '../../commons/modals/modal';
import {ModalInput} from '../../commons/modals/ModalInput';
import {ModalHeader} from '../../commons/modals/ModalHeader';
import {homeworkService} from '../../../services/services';


const CreateHomeworkModal = ({show, onClose, onHomeworkCreated}) => {

  const [name, setName] = useState(undefined);
  const [content, setContent] = useState(undefined);

  const nameInputRef = createRef();
  const closeIconRef = createRef();
  let formRef;

  const handleSubmit = e => {
    e.preventDefault();
    const problemIds = content.split('\n');
    homeworkService.createHomework(name, problemIds)
      .then(homework => onHomeworkCreated(homework));
    closeIconRef.current.click();
    setName('');
    setContent('');
  };

  return renderModal({
    modalClassName: 'textarea-modal',
    modalWidth: '465px',
    show, onClose, closeIconRef,
    contentRendering: () => (
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="p-5 has-text-centered">
          <ModalHeader className="header" title="Create homework"
            style={{textAlign: 'left'}}/>
          <p className="description">Homework Name</p>
          <ModalInput ref={nameInputRef} value={name} required={true} fontSize="20px" height="41px"
            placeholder={'Homework Name'}
            style={{textAlign: 'left'}}
            placeholderTextAlign="left"
            onChange={e => setName(e.target.value)}/>

          <p className="description">Problems</p>
          <textarea className="textarea" value={content}
            style={{backgroundColor: '#F9F9F9'}}
            placeholder={'problem1-id\nproblem2-id'}
            onChange={e => setContent(e.target.value)}/>
          <div className="column">
            <p className="remark">＊One problem ID per line.</p>
          </div>
          <div className="column">
            <button className="button mt-5" id="add-btn">Create</button>
          </div>
        </div>
      </form>
    )
  });

};


export {CreateHomeworkModal};
