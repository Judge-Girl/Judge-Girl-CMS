import {SubtitleLine} from "../../commons/titles/TitleLine";
import {useTags} from "../../usecases/TagUseCase";
import {TextInputField} from "../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../problem-old/edit/TextInputItems";
import './ExamOptions.scss';

const ExamWhiteList = () => {
    const {tags, addTag, removeTag} = useTags();
    return (
        <div>
            <SubtitleLine title={"WhiteList"}/>
            <TextInputField placeholder={'Add IP'} onSubmit={addTag}/>
            <TextInputItems items={tags} removeItem={removeTag}/>
        </div>
    )
};

export default ExamWhiteList
