import React from 'react';
import {ACTION_UPDATE_TITLE, useProblemEditorContext} from '../context';
import {useEffect, useState} from 'react';
import {problemService} from '../../../../services/services';
import {FaEdit} from 'react-icons/all';
import {EditSaveCancelButton} from '../../commons/EditSaveCancelButton';


const ProblemTitle = () => {
  const {problem, dispatch} = useProblemEditorContext();
  const [title, setTitle] = useState(undefined);
  const [titleBackup, setTitleBackup] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (problem) {
      if (!title) {
        setTitle(problem.title);
        if (!titleBackup) {
          setTitleBackup(problem.title);
        }
      }
    }
  }, [problem, title, setTitle, titleBackup, setTitleBackup]);


  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickSave = () => {
    if (title.length === 0) {
      return;
    }

    problemService.updateProblemTitle(problem.id, title)
      .then(() => {
        dispatch({type: ACTION_UPDATE_TITLE, title});
        console.log('The problem\'s title has been modified');
      });
    setIsEditing(false);
  };

  const onClickCancel = () => {
    setIsEditing(false);
    setTitle(titleBackup);
  };

  if (!title) {
    return '';
  }

  return <>
    <div className="problem-title">
      {!isEditing?
        <div className="not-on-edit">
          <div>{title}</div>
          <FaEdit className="edit-icon" onClick={onClickEdit}/>
        </div>
        :
        <form className="on-edit">
          <input className="input-field"
            type="text"
            required value={title}
            onChange={e => setTitle(e.target.value)}/>
          <EditSaveCancelButton
            isEditing={isEditing}
            onClickSave={onClickSave}
            onClickCancel={onClickCancel}/>
        </form>
      }
    </div>
  </>;
};

export default ProblemTitle;
