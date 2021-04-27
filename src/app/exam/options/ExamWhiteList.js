import {SubtitleLine} from "../../commons/titles/TitleLine";
import React from "react";
import {useTags} from "../../usecases/TagUseCase";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "../../problem/edit/TextInputItems";
import './ExamOptions.css';

const ExamWhiteList = () => {
  const {tags, addTags, removeTag} = useTags();
  return (
    <div>
      <SubtitleLine title={"WhiteList"}/>
      <TextInputForm placeholder={"Add New Tags"} onSubmit={addTags}/>
      <TextInputItems items={tags} removeItems={removeTag}/>
    </div>
  )
}

export default ExamWhiteList