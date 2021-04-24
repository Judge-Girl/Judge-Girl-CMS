import React, {createRef, useState} from "react";
import {now} from "moment";
import {SubtitleLine, TitleLine} from "../commons/titles/TitleLine";
import {UpdateChangeButton} from "./ExamAdminPage/UpdateChangeButton";
import {scheduleItem} from "../../utils/utils";
import './ExamOptions.css';
import {withRouter} from "react-router";
import {ModalInput} from "../commons/modals/ModalInput";
import {ExamInPageNavigationBar} from "./ExamInPageNavigationBar";
import AddTag from "./AddTag";
import Tags from "./Tags";

const ExamOptions = withRouter(({history}) => {
  const oneHour = 60 * 60 * 1000;
  const currentPathName = history.location.pathname;
  const [startTime, setStartTime] = useState(now() + oneHour);
  const [endTime, setEndTime] = useState(now() + oneHour * 2);
  const [name, setName] = useState(null);
  const startTimeInputRef = createRef();
  const endTimeInputRef = createRef();
  const nameInputRef = createRef()

  const setStartTimeHandler = (startTime) => {
    setStartTime(startTime);
    validateTimes(startTime, endTime);
  };
  const setEndTimeHandler = (endTime) => {
    setEndTime(endTime);
    validateTimes(startTime, endTime);
  };

  const validateTimes = (startTime, endTime) => {
    if (now() >= startTime) {
      startTimeInputRef.current.setCustomValidity("The exam's start time must come after the current time.");
    } else if (startTime >= endTime) {
      endTimeInputRef.current.setCustomValidity("The exam's end time must come after the start time.");
    } else {
      startTimeInputRef.current.setCustomValidity("");
      endTimeInputRef.current.setCustomValidity("");
    }
  };

  const [lists, setLists] = useState([
    {
      id: 1,
      text: 'Tag1',
    },
    {
      id: 2,
      text: 'Tag2',
    },
    {
      id: 3,
      text: 'Tag3',
    }
  ])
  const [currentId, setCurrentId] = useState(0)

  const deleteTag = (id) => {
    setLists(lists.filter((item) => item.id !== id))
  }

  const addTag = (tag) => {
    const id = currentId
    setCurrentId(currentId+1)
    const newTag = { id, ...tag }
    setLists([...lists, newTag])
  }

  return (
    <>
      <ExamInPageNavigationBar currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>
      <div style={{padding: "40px 100px 20px 100px"}}>
        <TitleLine title={"Options"}/>
        <div style={{width: "350px"}}>
          <SubtitleLine title={"Exam Name"}/>
          <ModalInput ref={nameInputRef} value={name}
                      fontSize="18px" height="11px"
                      placeholder="e.g. 2021 C Final"
                      placeholderTextAlign="left"
                      onChange={e => setName(e.target.value)}/>

          <SubtitleLine title={"Schedule"}/>
          { scheduleItem(startTimeInputRef, 'Start Time', 'startTime', startTime, setStartTimeHandler, new Date()) }
          { scheduleItem(endTimeInputRef, 'End Time', 'endTime', endTime, setEndTimeHandler, new Date(startTime)) }
          <SubtitleLine title={"WhiteList"}/>
          <div>
            <AddTag onAdd={ addTag }/>
            {
              lists.length > 0?
                <Tags tags={ lists } onDelete={ deleteTag }/>
                : "No Tag"
            }
          </div>
          <UpdateChangeButton onUpdateChangeButtonClick={() => {
            console.log(lists)
          }}/>
        </div>
      </div>
    </>
  )
})


export {ExamOptions}