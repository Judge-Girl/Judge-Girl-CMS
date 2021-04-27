import {SubtitleLine} from "../../commons/titles/TitleLine";
import React, {createRef, useState} from "react";
import {now} from "moment";
import ScheduleItem from "../../commons/ScheduleItem";

const ExamSchedule = () => {
  const oneHour = 60 * 60 * 1000;
  const [startTime, setStartTime] = useState(now() + oneHour);
  const [endTime, setEndTime] = useState(now() + oneHour * 2);
  const startTimeInputRef = createRef();
  const endTimeInputRef = createRef();

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
      <SubtitleLine title={"Schedule"}/>
      <ScheduleItem inputRef={startTimeInputRef} label="Start Time" inputName="startTime" timeValue={startTime}
                    setTime={setStartTimeHandler} minTime={new Date()}/>
      <ScheduleItem inputRef={endTimeInputRef} label="End Time" inputName="endTime" timeValue={endTime}
                    setTime={setEndTimeHandler} minTime={new Date(startTime)}/>
    </>
  )
}





export default ExamSchedule