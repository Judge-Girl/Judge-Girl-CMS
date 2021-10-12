import React from 'react';
import './UploadFileButton.scss';
import {FiUpload} from 'react-icons/all';

/**
 * @param {string} buttonName, the name (str) of the button
 * @param {string} buttonColor the button color
 * @param {callback} onFilesUploaded, the callback function when you upload the file
 * @param {boolean} multipleFiles, upload multipleFiles or not
 * @param {string} fontSize, this is a CSS style of the font size
 * @param {string} buttonHeight, the height of the button
 */
const UploadFileButton = ({buttonName, buttonColor, onFilesUploaded, multipleFiles, fontSize, buttonHeight}) => {
  return <label className='upload-file-button'>
    <input type="file" onChange={onFilesUploaded} multiple={multipleFiles}/>
    <div className="upload-file-button-name" style={{background: buttonColor, fontSize, height: buttonHeight}}>
      {buttonName} <FiUpload size={18} style={{paddingLeft: '3px'}}/>
    </div>
  </label>;
};

export default UploadFileButton;
