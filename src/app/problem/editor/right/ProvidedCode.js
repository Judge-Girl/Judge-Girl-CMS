import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import ProvidedCodeItems from "./ProvidedCodeItems";
import {useUploads} from "../../../usecases/UploadFilesUseCase";
import TagWithIconList from "../../commons/TagWithIconList";
import {FiUpload, VscFileCode} from "react-icons/all";
import {EditorButton} from "../../commons/EditorButton";


const ProvidedCode = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {files, addFile, removeFile} = useUploads();

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
    }

    const onClickCancel = () => {
        setIsEditing(false);
    }

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
                <TagWithIconList icon={<VscFileCode/>} style={{color: "rgba(18, 115, 186, 1)"}}
                                 items={files.map(file => file.name)}/>
                :
                <>
                    <ProvidedCodeItems files={files} removeFile={removeFile}/>
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