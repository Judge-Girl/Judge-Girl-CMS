import '../ProblemEditorOld.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputField} from "../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../problem/commons/TextInputItems";

function TagList() {
    const {tags, addTag, removeTag} = useTags();

    return (
        <div>
            <SubtitleLine title={"Tags"}/>
            <TextInputField placeholder={"Add New Tags"} onSubmit={addTag} style={{width: "234px"}}/>
            <TextInputItems items={tags} removeItem={removeTag}/>
        </div>
    )
}

export default TagList
