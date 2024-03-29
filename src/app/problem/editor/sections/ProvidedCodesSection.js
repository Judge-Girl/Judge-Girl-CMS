import React from 'react';
import EditorSection from './commons/EditorSection';
import {useEffect, useState} from 'react';
import {EditSaveCancelButton} from '../../commons/EditSaveCancelButton';
import {useUploads} from '../../../usecases/UploadFilesUseCase';
import {ACTION_UPDATE_PROVIDEDCODES, useProblemEditorContext} from '../context';
import IconTextItems from '../../../commons/TextInputForm/IconTextItems';
import FixedUploadFileItems from './commons/FixedUploadFileItems';
import UploadFileButton from '../../commons/UploadFileButton';
import {VscFileCode} from 'react-icons/all';
import {problemService} from '../../../../services/services';


const ProvidedCodesSection = () => {
  const {problem, dispatch} = useProblemEditorContext();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [providedCodes, setProvidedCodes] = useState(undefined);
  const {files, setFiles, addFiles, removeFile} = useUploads();

  useEffect(() => {
    if (problem) {
      if (!providedCodes) {
        /* ProvidedCodesSection may not exist in languageEnv,
                 * If providedCodes doesn't exist, set an empty array for providedCodesFileNames
                 */
        setProvidedCodes(problem.languageEnvs[0].providedCodes || {fileNames: [], fileId: ''});
      }
    }
  }, [problem, providedCodes, setProvidedCodes]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickSave = () => {
    setIsEditing(false);
    setSaving(true);
    problemService.uploadProvidedCodes(problem.id, 'C', files)
      .then((fileId) => {
        const newProvidedCodes = {fileNames: files.map(f => f.name), fileId};
        const newLanguageEnv = {
          ...problem.languageEnvs[0], providedCodes: newProvidedCodes
        };
        dispatch({type: ACTION_UPDATE_PROVIDEDCODES, languageEnv: newLanguageEnv});
        setProvidedCodes(newProvidedCodes);
        console.log('The problem\'s providedCodes has been updated');
      }).finally(() => setSaving(false));
  };

  const onClickCancel = () => {
    setIsEditing(false);
    setFiles([]);
  };

  if (!providedCodes) {
    return '';
  }
  return <>
    <EditorSection title="Provided Code"
      id="problem-editor-provided-code"
      titleButton={
        <EditSaveCancelButton
          isEditing={isEditing}
          loading={saving}
          onClickEdit={onClickEdit}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}/>
      }>
      {!isEditing ?
        <IconTextItems icon={<VscFileCode size={22}/>}
          items={providedCodes.fileNames}/>
        :
        <>
          <FixedUploadFileItems
            items={files.map(f => {
              return {key: f.name, text: f.name};
            })}
            fileRemovable={removeFile}
            removeItem={item => removeFile(item.text)}
            style={{marginBottom: '5px', width: '16rem'}}/>
          <UploadFileButton
            buttonName='Upload Codes'
            buttonColor='rgba(241, 196, 15, 1)'
            onFilesUploaded={e => addFiles(Array.from(e.target.files))}
            multipleFiles={true}
            fontSize='16px'
            buttonHeight='36px'/>
        </>
      }
    </EditorSection>
  </>;
};

export default ProvidedCodesSection;
