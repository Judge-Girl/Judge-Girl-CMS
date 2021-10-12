import React, {useEffect, useState} from 'react';
import './CompilationScript.scss';
import EditorSection from './EditorSection';
import {EditSaveCancelButton} from '../../commons/EditSaveCancelButton';
import {problemService} from '../../../../services/services';
import {ACTION_UPDATE_LANGUAGE_ENV, useProblemEditorContext} from '../context';

const CompilationScript = () => {
  const {problem, dispatch} = useProblemEditorContext();
  const [compilation, setCompilation] = useState(undefined);
  const [compilationBackup, setCompilationBackup] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (problem) {
      if (!compilation) {
        setCompilation(problem.languageEnvs[0].compilation);
        if (!compilationBackup) {
          setCompilationBackup(problem.languageEnvs[0].compilation);
        }
      }
    }
  }, [problem, compilation, setCompilation, compilationBackup, setCompilationBackup]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickSave = () => {
    setIsEditing(false);
    const newLanguageEnv = {...problem.languageEnvs[0], compilation};
    problemService.updateLanguageEnv(problem.id, newLanguageEnv)
      .then(() => {
        dispatch({type: ACTION_UPDATE_LANGUAGE_ENV, languageEnv: newLanguageEnv});
        setCompilationBackup(compilation);
        console.log('The problem\'s compilation script has been updated');
      });
  };

  const onClickCancel = () => {
    setIsEditing(false);
    setCompilation(compilationBackup);
  };

  if (!compilation) {
    return '';
  }
  return <>
    <EditorSection title="Compilation Script"
                   id="problem-editor-compilation-script"
                   titleButton={
                     <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
                   }>

      <div className={'compilation-script'}>
        {isEditing ?
          <>
            <textarea className="compile-script-text-area"
                      placeholder="gcc a.out -o main.c"
                      value={compilation.script}
                      onChange={e => setCompilation({...compilation, script: e.target.value})}/>
            <button className="auth-generation-button button">
              Auto Generate
            </button>
          </> : <div>{compilation.script}</div>
        }
      </div>
    </EditorSection>
  </>;
};

export default CompilationScript;
