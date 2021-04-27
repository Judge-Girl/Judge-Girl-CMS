import React, {createRef, useState} from "react";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {ModalInput} from "../../commons/modals/ModalInput";

const ExamName = () => {
  const [name, setName] = useState(null);
  const nameInputRef = createRef();
  return (
    <>
      <SubtitleLine title={"Name"}/>
      <ModalInput ref={nameInputRef} value={name}
                  fontSize="20px" height="11px"
                  placeholder="E.g. 2021 Sample-Final"
                  placeholderTextAlign="left"
                  onChange={e => setName(e.target.value)}/>
    </>
  )
}





export default ExamName