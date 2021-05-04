import React, {createRef, useState} from "react";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {ModalInput} from "../../commons/modals/ModalInput";

const ExamName = ({examName, setter}) => {
    return (
        <>
            <SubtitleLine title={"Name"}/>
            <ModalInput value={examName}
                        fontSize="20px" height="11px"
                        placeholder="Enter a new name here!"
                        placeholderTextAlign="left"
                        onChange={e => setter(e.target.value)}/>
        </>
    )
}


export default ExamName