import './UploadFileButton.scss';
import {FiUpload} from "react-icons/all";

const UploadFileButton = ({buttonName, buttonColor, onFilesUploaded, multipleFiles, fontSize, buttonHeight}) => {
    return <label>
        <input type="file"
               style={{cursor: "pointer", display: "none"}}
               onChange={onFilesUploaded} multiple={multipleFiles}/>
        <div className="upload-file-button" style={{background: buttonColor, fontSize, height: buttonHeight}}>
            {buttonName} <FiUpload size={18} style={{paddingLeft: "3px"}}/>
        </div>
    </label>
};

export default UploadFileButton;
