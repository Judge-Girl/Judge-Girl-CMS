import {AiOutlineClose} from "react-icons/ai";
import "../../../commons/TextInputForm/FixedTextInputField.scss";
import {VscFileCode} from "react-icons/all";
import React from "react";

function FixedUploadFileItems({files, removeFile, style}) {
    return files.map((file) => (
        <div className="fixed-text-input-field" style={style}>
            <VscFileCode size={22} style={{paddingRight: "5px"}}/>
            <div className="text-item">{file.name}</div>
            <div className="text-item-remove-button"
                 onClick={() => removeFile(file)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
}

export default FixedUploadFileItems;
