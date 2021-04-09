import React, {useState} from 'react';
import {SubtitleLine} from "../../../commons/titles/TitleLine";
import ProvidedCodeItem from "./ProvidedCodeItem";
import {UploadFileButton} from "../UploadFileButton";
import './ProvidedCodeList.css';

function ProvidedCodeList() {
    const [files, setFiles] = useState([]);

    const addFile = (event) => {
        // Cancel button makes event undefined.
        if (!event.target.files[0]) return;
        const newFiles = [event.target.files[0], ...files];
        setFiles(newFiles);
    };

    const removeFile = fileName => {
        const removeAttr = [...files].filter(file => file.name !== fileName);
        setFiles(removeAttr);
    };

    return (
        <div>
            <SubtitleLine title={"Provided Code"}/>
            <ProvidedCodeItem files={files} removeFile={removeFile}/>
            <UploadFileButton
                title={"Upload Provided Code +"}
                onChange={addFile}
                width={215} height={33}
                buttonColor={"#3EBDD9"}
                borderRadius={10}
                fontWeight={600}
                fontSize={15}
                lineHeight={22}
                fontColor={"white"}
                display={"flex"}
            />
        </div>
    )
}

export default ProvidedCodeList;