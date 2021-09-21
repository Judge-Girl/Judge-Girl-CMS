import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import FixedUploadFileItems from "./FixedUploadFileItems";
import {useUploads} from "../../../usecases/UploadFilesUseCase";
import IconTextItems from "../../../commons/TextInputForm/IconTextItems.js";
import {FiUpload, VscFileCode} from "react-icons/all";
import {EditorButton} from "../../commons/EditorButton";


const ProvidedCode = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {files, addFile, removeFile} = useUploads();

    const onClickEdit = () => {
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
    };

    const onClickCancel = () => {
        setIsEditing(false);
    };

    return <>
        <Block title="Provided Code"
               id="problem-editor-provided-code"
               titleButton={
               <EditSaveCancelButton
                   isEditing={isEditing}
                   onClickEdit={onClickEdit}
                   onClickSave={onClickSave}
                   onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <IconTextItems icon={<VscFileCode size={22}/>}
                               items={files.map(file => file.name)}/>
                :
                <>
                    <FixedUploadFileItems files={files} removeFile={removeFile} style={{width: "16rem"}}/>
                    <EditorButton
                        text={<div>Upload Code <FiUpload/></div>}
                        type="file"
                        buttonColor="rgba(241, 196, 15, 1)"
                        fontSize="16px"
                        fontColor="#fff"
                        width="11em"
                        height="36px"
                        borderRadius="50px"
                        onClick={addFile} />
                </>
            }
        </Block>
    </>;
};

export default ProvidedCode;
