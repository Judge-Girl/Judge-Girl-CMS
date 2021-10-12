import React from 'react';
import EditorSection from './EditorSection';
import {useEffect, useState} from 'react';
import {useTextItems} from '../../../usecases/TextItemUseCase';
import {TextInputField} from '../../../commons/TextInputForm/TextInputField';
import {FixedTextInputField} from '../../../commons/TextInputForm/FixedTextInputField';
import {EditSaveCancelButton} from '../../commons/EditSaveCancelButton';
import IconTextItems from '../../../commons/TextInputForm/IconTextItems.js';
import {AiOutlinePaperClip} from 'react-icons/all';
import {problemService} from '../../../../services/services';
import {ACTION_UPDATE_LANGUAGE_ENV, useProblemEditorContext} from '../context';


const SubmittedCodeSpec = () => {
  const {problem, dispatch} = useProblemEditorContext();
  const {textItems: fileNames, setTextItems: setFileNames,
    addTextItem: addFileName, removeTextItem: removeFileName} = useTextItems(undefined);
  const [fileNamesBackup, setFileNamesBackup] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (problem) {
      if (!fileNames) {
        const fileNames = problem.languageEnvs[0].submittedCodeSpecs.map(s => s.fileName);
        setFileNames(fileNames);
        if (!fileNamesBackup) {
          setFileNamesBackup(fileNames);
        }
      }
    }
  }, [problem, fileNames, setFileNames, fileNamesBackup, setFileNamesBackup]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickSave = () => {
    setIsEditing(false);
    const newLanguageEnv = {
      ...problem.languageEnvs[0],
      submittedCodeSpecs: fileNames.map(fileName => {
        return {format: 'C', fileName};
      })
    };
    problemService.updateLanguageEnv(problem.id, newLanguageEnv)
      .then(() => {
        dispatch({type: ACTION_UPDATE_LANGUAGE_ENV, languageEnv: newLanguageEnv});
        console.log('The problem\'s SubmittedCodeSpec has been updated');
        setFileNamesBackup(fileNames);
      });
  };

  const onClickCancel = () => {
    setIsEditing(false);
  };

  if (!fileNames) {
    return '';
  }

  return <>
    <EditorSection title="Submitted Code Spec"
      id="problem-editor-submitted-code-spec"
      titleButton={
        <EditSaveCancelButton
          isEditing={isEditing}
          onClickEdit={onClickEdit}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}/>
      }>
      {!isEditing ?
        <IconTextItems icon={<AiOutlinePaperClip/>}
          items={fileNames}/>
        :
        <>
          <TextInputField placeholder={'Add Submitted Code File Name'} onSubmit={addFileName}
            style={{width: '250px'}}/>
          <FixedTextInputField items={fileNames} removeItem={removeFileName} iconSize={15}/>
        </>
      }
    </EditorSection>
  </>;
};

export default SubmittedCodeSpec;
