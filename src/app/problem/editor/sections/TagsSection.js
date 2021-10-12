import React from 'react';
import EditorSection from './commons/EditorSection';
import {useEffect, useState} from 'react';
import {EditSaveCancelButton} from '../../commons/EditSaveCancelButton';
import {TextInputField} from '../../../commons/TextInputForm/TextInputField';
import {FixedTextInputField} from '../../../commons/TextInputForm/FixedTextInputField';
import IconTextItems from '../../../commons/TextInputForm/IconTextItems.js';
import {useTextItems} from '../../../usecases/TextItemUseCase';
import {BsTag} from 'react-icons/all';
import {problemService} from '../../../../services/services';
import {ACTION_UPDATE_TAGS, useProblemEditorContext} from '../context';


const TagsSection = () => {
  const {problem, dispatch} = useProblemEditorContext();
  const [tagsBackUp, setTagsBackup] = useState(undefined);
  const {textItems: tags, setTextItems: setTags, addTextItem: addTag, removeTextItem: removeTag} = useTextItems(undefined);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (problem) {
      if (!tags) {
        setTags(problem.tags);
        if (!tagsBackUp) {
          setTagsBackup(problem.tags);
        }
      }
    }
  }, [problem, tags, setTags, tagsBackUp, setTagsBackup]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickSave = () => {
    setIsEditing(false);
    problemService.updateProblemTags(problem.id, tags)
      .then(() => {
        dispatch({type: ACTION_UPDATE_TAGS, tags});
        console.log('The problem\'s tags has been modified');
        setTagsBackup(tags);
      });
  };

  const onClickCancel = () => {
    setIsEditing(false);
    setTags(tagsBackUp);
  };

  if (!tags) {
    return '';
  }

  return <>
    <EditorSection title="TagsSection"
      id="problem-editor-tags"
      titleButton={
        <EditSaveCancelButton
          isEditing={isEditing}
          onClickEdit={onClickEdit}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}/>
      }>
      {!isEditing ?
        <IconTextItems icon={<BsTag size={21}/>}
          items={tags}/>
        :
        <>
          <TextInputField placeholder={'Add New TagsSection'} style={{width: '234px'}}
            onSubmit={addTag}/>
          <FixedTextInputField items={tags} removeItem={removeTag} iconSize={15}/>
        </>
      }
    </EditorSection>
  </>;
};

export default TagsSection;
