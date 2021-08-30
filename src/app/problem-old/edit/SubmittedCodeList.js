import '../ProblemEditorOld.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputField} from "../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../problem/commons/TextInputItems";

function SubmittedCodeList() {
    const {tags, addTag, removeTag} = useTags();
    return (
        <div>
            <SubtitleLine title={"Submitted Code Spec"}/>
            <TextInputField placeholder={"Add Submitted Code File Name"} onSubmit={addTag}/>
            <TextInputItems items={tags} removeItem={removeTag}/>
        </div>
    )
}

export default SubmittedCodeList
