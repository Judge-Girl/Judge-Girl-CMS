import React, {createRef, useState} from "react";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {ModalInput} from "../../commons/modals/ModalInput";

const ExamName = ({examName}) => {
  const [name, setName] = useState(examName);
  const nameInputRef = createRef();
  return (
    <>
      <SubtitleLine title={"Name"}/>
      <ModalInput ref={nameInputRef} value={name}
                  fontSize="20px" height="11px"
                  placeholder="Enter a new name here!"
                  placeholderTextAlign="left"
                  onChange={e => setName(e.target.value)}/>
    </>
  )
}





export default ExamName