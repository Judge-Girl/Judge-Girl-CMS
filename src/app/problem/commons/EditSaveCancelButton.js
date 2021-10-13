import './EditSaveCancelButton.scss';
import React from 'react';
import DotLoader from 'react-spinners/DotLoader';

export const EditSaveCancelButton = ({isEditing, disableSave=false, loading=false, onClickEdit, onClickSave, onClickCancel}) => {
  return <>
    <div className="edit-save-cancel-button is-flex-direction-row">
      {!isEditing?
        <button className="edit button" onClick={onClickEdit}>Edit</button>
        :
        <>
          <button className="save button"
            disabled={disableSave}
            onClick={onClickSave}>Save</button>
          <button className="cancel button" onClick={onClickCancel}>Cancel</button>
          <DotLoader color={'white'} loading={loading} css={{marginLeft: '10px'}} size={10} />
        </>
      }
    </div>
  </>;
};
