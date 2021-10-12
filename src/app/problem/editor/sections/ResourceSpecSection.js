import React from 'react';
import EditorSection from './commons/EditorSection';
import {useEffect, useState} from 'react';
import {EditSaveCancelButton} from '../../commons/EditSaveCancelButton';
import {FiCpu} from 'react-icons/all';
import {problemService} from '../../../../services/services';
import {ACTION_UPDATE_LANGUAGE_ENV, useProblemEditorContext} from '../context';


const ResourceSpecSection = () => {
  const {problem, dispatch} = useProblemEditorContext();
  const [isEditing, setIsEditing] = useState(false);
  const [resourceSpec, setResourceSpec] = useState(undefined);
  const [resourceSpecBackup, setResourceSpecBackup] = useState(undefined);

  const languageEnv = () => problem.languageEnvs[0];

  useEffect(() => {
    if (problem) {
      if (!resourceSpec) {
        setResourceSpec(problem.languageEnvs[0].resourceSpec);
        if (!resourceSpecBackup) {
          setResourceSpecBackup(problem.languageEnvs[0].resourceSpec);
        }
      }
    }
  }, [problem, resourceSpec, setResourceSpec, resourceSpecBackup, setResourceSpecBackup]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickSave = () => {
    setIsEditing(false);
    const newLanguageEnv = {...languageEnv(), resourceSpec};
    problemService.updateLanguageEnv(problem.id, newLanguageEnv)
      .then(() => {
        dispatch({type: ACTION_UPDATE_LANGUAGE_ENV, languageEnv: newLanguageEnv});
        setResourceSpecBackup(resourceSpec);
        console.log('The problem\'s ResourceSpecCpu and ResourceSpeGpu have been updated');
      }).catch(err => alert(err.message));
  };

  const onClickCancel = () => {
    setIsEditing(false);
    setResourceSpec(resourceSpecBackup);
  };

  if (!resourceSpec) {
    return '';
  }

  return <>
    <EditorSection title="Resource Spec"
      id="problem-editor-resource-spec"
      titleButton={
        <EditSaveCancelButton
          isEditing={isEditing}
          onClickEdit={onClickEdit}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}/>
      }>
      {/* TODO: Refactor to a new component. */}
      {/* TODO: Move css properties to ProblemEditorRoot.scss. */}
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '1.5em'}}>
        <FiCpu/>
        <span style={{width: '35px', marginLeft: '5px', color: 'rgba(18, 115, 186, 1)'}}>CPU</span>
        {!isEditing ?
          <span style={{marginLeft: '5px', color: 'rgba(18, 115, 186, 1)'}}>{resourceSpec.cpu}</span>
          :
          <input type="number" className="input-box" value={resourceSpec.cpu}
            onChange={e => setResourceSpec({...resourceSpec, cpu: parseFloat(e.target.value)})}/>
        }
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '1.5em'}}>
        <FiCpu/>
        <span style={{width: '35px', marginLeft: '5px', color: 'rgba(18, 115, 186, 1)'}}>GPU</span>
        {!isEditing ?
          <span style={{marginLeft: '5px', color: 'rgba(18, 115, 186, 1)'}}>{resourceSpec.gpu}</span>
          :
          <input type="number" className="input-box" value={resourceSpec.gpu}
            onChange={e => setResourceSpec({...resourceSpec, gpu: parseFloat(e.target.value)})}/>
        }
      </div>
    </EditorSection>
  </>;
};

export default ResourceSpecSection;
