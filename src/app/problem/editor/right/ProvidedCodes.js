import Block from "./Block";
import {useEffect, useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {useUploads} from "../../../usecases/UploadFilesUseCase";
import {ACTION_UPDATE_PROVIDEDCODES, useProblemEditorContext} from "../context";
import IconTextItems from "../../../commons/TextInputForm/IconTextItems";
import FixedUploadFileItems from "./FixedUploadFileItems";
import UploadFileButton from "../../commons/UploadFileButton";
import {VscFileCode} from "react-icons/all";
import {problemService} from "../../../../services/services";


const ProvidedCodes = () => {
    const {problem, dispatch} = useProblemEditorContext();
    const [isEditing, setIsEditing] = useState(false);
    const [providedCodes, setProvidedCodes] = useState(undefined);
    const {files, setFiles, addFiles, removeFile} = useUploads();

    useEffect(() => {
        if (problem) {
            if (!providedCodes){
                /* ProvidedCodes may not exist in languageEnv,
                 * If providedCodes doesn't exist, set an empty array for providedCodesFileNames
                 */
                const problemProvidedCodes = problem.languageEnvs[0].providedCodes;
                if (problemProvidedCodes) {
                    setProvidedCodes(problemProvidedCodes);
                } else {
                    setProvidedCodes({providedCodesFileNames: [], providedCodes: ""});
                }
            }
        }
    }, [problem, providedCodes, setProvidedCodes]);


    const onClickEdit = () => {
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
        problemService.uploadProvidedCodes(problem.id, 'C', files)
            .then((providedCodesFileId) => {
                let newProvidedCodes = {providedCodesFileNames: files.map(f => f.name), providedCodesFileId};
                const newLanguageEnv = {
                    ...problem.languageEnvs[0], providedCodes: newProvidedCodes
                };
                dispatch({type: ACTION_UPDATE_PROVIDEDCODES, languageEnv: newLanguageEnv});
                setProvidedCodes(newProvidedCodes);
                console.log("The problem's SubmittedCodeSpec has been updated");
            });
    };

    const onClickCancel = () => {
        setIsEditing(false);
        setFiles([]);
    };

    if (!providedCodes) {
        return "";
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
            {!isEditing ?
                <IconTextItems icon={<VscFileCode size={22}/>}
                               items={providedCodes.providedCodesFileNames}/>
                :
                <>
                    <FixedUploadFileItems
                        items={files.map(f => {
                            return {key: f.name, text: f.name}
                        })}
                        fileRemovable={removeFile}
                        removeItem={item => removeFile(item.text)}
                        style={{marginBottom: "5px", width: "16rem"}}/>
                    <UploadFileButton
                        buttonName='Upload Codes'
                        buttonColor='rgba(241, 196, 15, 1)'
                        onFilesUploaded={e => addFiles(Array.from(e.target.files))}
                        multipleFiles={true}
                        fontSize='16px'
                        buttonHeight='36px'/>
                </>
            }
        </Block>
    </>;
};

export default ProvidedCodes;
