import React, {useEffect, useState} from 'react';
import './VisibleSection.scss';
import EditorSection from './commons/EditorSection';
import {ACTION_UPDATE_VISIBILITY, useProblemEditorContext} from '../context';
import {problemService} from '../../../../services/services';

const VisibilitySection = () => {
  const {problem, dispatch} = useProblemEditorContext();
  const [visibility, setVisibility] = useState(undefined);

  useEffect(() => {
    if (problem) {
      if (visibility === undefined) {
        setVisibility(problem.visible);
      }
    }
  }, [problem, visibility, setVisibility]);

  const onVisibleButtonClick = (newVisibility) => {
    if (newVisibility !== visibility) {
      setVisibility(newVisibility);
      problemService.updateProblemVisibility(problem.id, newVisibility)
        .then(() => {
          console.log(`The problem's visibility has been modified to --> ${newVisibility}`);
          dispatch({type: ACTION_UPDATE_VISIBILITY, visible: newVisibility});
        });
    }
  };

  return <>
    <EditorSection title="VisibilitySection"
      id="problem-editor-visible"
      titleButton={
        <div className="is-flex-direction-row">
          <button className="switch-button on button"
            style={{backgroundColor: visibility ? 'rgba(51, 155, 231, 1)' : null,
              color: visibility ? '#FFF' : 'rgba(124,124,124,1)'}}
            onClick={() => onVisibleButtonClick(true)}>ON</button>
          <button className="switch-button off button"
            style={{backgroundColor: visibility ? null : 'rgba(51, 155, 231, 1)',
              color: visibility ? 'rgba(124,124,124,1)' : '#FFF'}}
            onClick={() => onVisibleButtonClick(false)}>OFF</button>
        </div>
      }>
            * The problem for exam used should be invisible. <br/>
            * If the problem is invisible, you can only see this problem in <i>invisible problem list</i>.
    </EditorSection>
  </>;
};

export default VisibilitySection;
