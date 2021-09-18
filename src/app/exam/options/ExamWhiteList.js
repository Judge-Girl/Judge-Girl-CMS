import {SubtitleLine} from "../../commons/titles/TitleLine";
import {useTextInputContent} from "../../usecases/TagUseCase";
import {TextInputField} from "../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../commons/TextInputForm/TextInputItems";
import './ExamOptions.scss';

const ExamWhiteList = () => {
    const {textInputContents, addTextInputContent, removeTextInputContent} = useTextInputContent();
    return (
        <div>
            <SubtitleLine title={"WhiteList"}/>
            <TextInputField placeholder={'Add IP'} onSubmit={addTextInputContent}/>
            <TextInputItems items={textInputContents} removeItem={removeTextInputContent}/>
        </div>
    )
};

export default ExamWhiteList
