import Block from "./Block";
import {useState} from "react";
import {useTags} from "../../../usecases/TagUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../commons/TextInputItems";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import TagWithIconList from "../../commons/TagWithIconList";
import {AiOutlinePaperClip} from "react-icons/all";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {problemService} from "../../../../services/services";
import {LanguageEnv} from "../../Model";


const SubmittedCodeSpec = () => {
    const {currentProblem} = useProblemEditorContext();
    const [isEditing, setIsEditing] = useState(false);
    const [tagsBackUp, setTagsBackUp] = useState(undefined);
    const languageEnv = new LanguageEnv(currentProblem.languageEnvs[0]);
    const {tags, addTag, removeTag, replaceTags} = useTags(languageEnv.getSubmittedCodeSpecFileNameTags());

    const onClickEdit = () => {
        setIsEditing(true);
        setTagsBackUp(tags);
    }

    const onClickSave = () => {
        setIsEditing(false);
        languageEnv.updateSubmittedCodeSpecs(tags.map(tag => tag.name));
        problemService.updateLanguageEnv(currentProblem.id, languageEnv)
            .then(() => {
                console.log("The problem's SubmittedCodeSpec has been updated");
            });
    }

    const onClickCancel = () => {
        setIsEditing(false);
        replaceTags(tagsBackUp);
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
                <TagWithIconList icon={<AiOutlinePaperClip/>}
                                 style={{color: "rgba(18, 115, 186, 1)"}}
                                 items={tags.map(tag => tag.name)}/>
                :
                <>
                    <TextInputField placeholder={"Add New Tags"} onSubmit={addTag} style={{width: "234px"}}/>
                    <TextInputItems items={tags} removeItem={removeTag}/>
                </>
            }
        </Block>
    </>;
};

export default SubmittedCodeSpec;
