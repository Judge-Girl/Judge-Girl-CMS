import Block from "./Block";
import {useState} from "react";
import {ESCButton} from "../commons/ESCButton";
import ProvidedCodeItem from "../../problem/edit/providedCode/ProvidedCodeItem";
import {UploadFileButton} from "../../problem/edit/UploadFileButton";
import {useUploads} from "../../usecases/UploadFilesUseCase";
import TagWithIconList from "../commons/TagWithIconList";
import {BsTag, VscFileCode} from "react-icons/all";

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
               <ESCButton
                   isEditing={isEditing}
                   onClickEdit={onClickEdit}
                   onClickSave={onClickSave}
                   onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <>
                    <TagWithIconList icon={<VscFileCode/>} style={{color: "rgba(18, 115, 186, 1)"}}
                                     items={files.map(file => file.name)}/>
                </>
                :
                <>
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
                </>
            }
        </Block>
    </>;
};

export default ProvidedCode;