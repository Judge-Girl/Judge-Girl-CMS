import EditorSection from './commons/EditorSection';
import './ActionsSection.scss';
import React, {useState} from 'react';
import {Divider} from './commons/Divider';
import {useHistory} from 'react-router-dom';
import {ACTION_DELETE, ACTION_UPDATE_ARCHIVED, useProblemEditorContext} from '../context';
import {problemService} from '../../../../services/services';
import {DeleteConfirmationModal} from '../../../commons/modals/ConfirmationModal';
import {useProblemContext} from '../../ProblemList';

const ActionItem = ({title, description, buttonName, onClick}) => {
  return <div className="action-item">
    <p className="action-title">{title}</p>
    <p className="action-description">{description}</p>
    <button className="action-btn" onClick={onClick}>{buttonName}</button>
  </div>;
};

const ActionsSection = () => {
  const history = useHistory();
  const {fetchProblems} = useProblemContext();
  const {problem, dispatch} = useProblemEditorContext();
  const [showDeleteProblemModal, setShowDeleteProblemModal] = useState(false);

  const archiveProblem = () => {
    problemService.archiveOrDeleteProblem(problem.id)
      .then(() => {
        console.log(`Problem ${problem.id} has been archived`);
        dispatch({type: ACTION_UPDATE_ARCHIVED, archived: true});
      })
      .then(fetchProblems);
  };

  const restoreProblem = () => {
    problemService.restoreProblem(problem.id)
      .then(() => {
        console.log(`Problem ${problem.id} has been restored`);
        dispatch({type: ACTION_UPDATE_ARCHIVED, archived: false});
      })
      .then(fetchProblems);
  };

  const deleteProblem = () => {
    problemService.archiveOrDeleteProblem(problem.id)
      .then(() => {
        console.log(`Problem ${problem.id} has been deleted`);
        dispatch({type: ACTION_DELETE});
        history.push('/problems');
      })
      .then(fetchProblems);
  };

  if (!problem) {
    return '';
  }

  return <>
    <EditorSection title="ActionsSection" id="problem-editor-actions">
      {problem.archived ?
        <>
          <ActionItem title="Restore"
            description="*You can see this problem on the problem list after restore this problem."
            buttonName="Restore This Problem"
            onClick={restoreProblem}/>

          <Divider/>
          <ActionItem title="Delete"
            description="*Once you delete a problem, there is no going back. Please be certain."
            buttonName="Delete This Problem"
            onClick={() => setShowDeleteProblemModal(true)}/>
        </>
        :
        <ActionItem title="Archive"
          description={<>
                                *Archive action will remove this problem from the problem list but it hasn’t been deleted.<br/>
                                You can find archive problems in the <i>Archived Problem list</i>.
          </>}
          buttonName="Archive This Problem"
          onClick={archiveProblem}/>
      }
    </EditorSection>

    <DeleteConfirmationModal title="Delete the Problem"
      data={[
        {
          title: 'Problem Title: ',
          value: problem?.title
        }
      ]}
      show={showDeleteProblemModal}
      onClose={() => setShowDeleteProblemModal(false)}
      onSubmit={deleteProblem}/>
  </>;
};

export default ActionsSection;
