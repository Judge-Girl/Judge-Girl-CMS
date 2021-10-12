import {AiOutlineClose} from 'react-icons/ai';
import '../../../../commons/TextInputForm/FixedTextInputField.scss';
import {VscFileCode} from 'react-icons/all';
import React from 'react';

function FixedUploadFileItems({items, fileRemovable = true, removeItem, style}) {

  return items.map((item) => (
    <div key={item.key} className="fixed-text-input-field" style={style}>
      <VscFileCode size={22} style={{paddingRight: '5px'}}/>
      <div className="text-item">{item.text}</div>
      {
        fileRemovable ?
          <div className="text-item-remove-button"
            onClick={() => removeItem(item)}>
            <AiOutlineClose size={15}/>
          </div>
          : ''
      }

    </div>
  ));
}

export default FixedUploadFileItems;
