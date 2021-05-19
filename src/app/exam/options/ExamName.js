import React, {useState} from "react";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {ModalInput} from "../../commons/modals/ModalInput";

const ExamName = ({examName, setter}) => {
    const [inputValue, setInputValue] = useState(examName)

    return (
        <>
            <SubtitleLine title={"Name"}/>
            <ModalInput value={inputValue}
                        fontSize="20px" height="11px"
                        placeholder="Enter a new name here!"
                        placeholderTextAlign="left"
                        onChange={e => {
                            setInputValue(e.target.value)
                            setter(e.target.value)
                        }}/>
        </>
    )
}


export default ExamName