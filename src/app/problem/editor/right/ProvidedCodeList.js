import React from 'react';
import {SubtitleLine} from "../../../commons/titles/TitleLine";
import ProvidedCodeItems from "./ProvidedCodeItems";
import {UploadFileButton} from "./UploadFileButton";
import './ProvidedCodeList.css';
import {useUploads} from "../../../usecases/UploadFilesUseCase";

function ProvidedCodeList() {
    const {files, addFile, removeFile} = useUploads();

    return (
        <div>
            <SubtitleLine title={"Provided Code"}/>
            <ProvidedCodeItems files={files} removeFile={removeFile}/>
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