import Block from "./Block";
import {useState} from "react";
import {TextInputContent, useTextInputContent} from "../../../usecases/TagUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../../commons/TextInputForm/TextInputItems";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import TextInputItemsPreview from "../../../commons/TextInputForm/TextInputItemsPreview.js";
import {AiOutlinePaperClip} from "react-icons/all";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {problemService} from "../../../../services/services";
import {LanguageEnv} from "../../Model";


const SubmittedCodeSpec = () => {
    const {currentProblem} = useProblemEditorContext();
    const [isEditing, setIsEditing] = useState(false);
    const [textInputContentBackUp, setTextInputContentBackUp] = useState(undefined);
    const languageEnv = new LanguageEnv(currentProblem.languageEnvs[0]);
    const {textInputContents, addTextInputContent, removeTextInputContent, replaceTextInputContent}
        = useTextInputContent(languageEnv.getSubmittedCodeSpecFileNames().map(name => new TextInputContent(name)));


    const onClickEdit = () => {
        setIsEditing(true);
        setTextInputContentBackUp(textInputContents);
    }

    const onClickSave = () => {
        setIsEditing(false);
        languageEnv.updateSubmittedCodeSpecs(textInputContents.map(content => content.text));
        problemService.updateLanguageEnv(currentProblem.id, languageEnv)
            .then(() => {
                console.log("The problem's SubmittedCodeSpec has been updated");
            });
    }

    const onClickCancel = () => {
        setIsEditing(false);
        replaceTextInputContent(textInputContentBackUp);
    }

    return <>
        <Block title="Submitted Code Spec"
               id="problem-editor-submitted-code-spec"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing ?
                <TextInputItemsPreview icon={<AiOutlinePaperClip/>}
                                       style={{color: "rgba(18, 115, 186, 1)"}}
                                       items={textInputContents.map(content => content.text)}/>
                :
                <>
                    <TextInputField placeholder={"Add Submitted Code File Name"} onSubmit={addTextInputContent} style={{width: "250px"}}/>
                    <TextInputItems items={textInputContents} removeItem={removeTextInputContent}/>
                </>
            }
        </Block>
    </>;
};

export default SubmittedCodeSpec;
