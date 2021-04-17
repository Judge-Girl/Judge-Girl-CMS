import React, {createRef, useState} from "react";
import {now} from "moment";
import {SubtitleLine, TitleLine} from "../commons/titles/TitleLine";
import {UpdateChangeButton} from "./ExamAdminPage/UpdateChangeButton";
import {scheduleItem} from "../../utils/utils";
import {ExamHome} from "./ExamHome";
import './ExamOptions.css';
import {withRouter} from "react-router";
import {ModalInput} from "../commons/modals/ModalInput";

const ExamOptions = withRouter(({history}) => {
  const currentPathName = history.location.pathname;
  const oneHour = 60 * 60 * 1000;
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

  return (
    <>
      <ExamHome currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>
      <div style={{padding: "40px 100px 20px 100px"}}>
        <TitleLine title={"Options"}/>
        <SubtitleLine title={"Name"}/>
        <ModalInput ref={nameInputRef} value={name} fontSize="20px" height="11px"
                      onChange={e => setName(e.target.value)}/>
        <SubtitleLine title={"Schedule"}/>
          { scheduleItem(startTimeInputRef, 'Start Time', 'startTime', startTime, setStartTimeHandler, new Date()) }
          { scheduleItem(endTimeInputRef, 'End Time', 'endTime', endTime, setEndTimeHandler, new Date(startTime)) }
        <SubtitleLine title={"WhiteList"}/>
          <div>
            <input type="text" id=""/><button onClick={() => {}}>+</button>
            <div id="result">
              <div>test<button>x</button></div>
              <div>test<button>x</button></div>
              <div>test<button>x</button></div>
            </div>
          </div>
        <UpdateChangeButton onUpdateChangeButtonClick={() => {}}/>
      </div>
    </>
  )
})


export {ExamOptions}