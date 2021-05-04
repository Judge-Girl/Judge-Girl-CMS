import {SubtitleLine} from "../../commons/titles/TitleLine";
import React, {createRef, useState} from "react";
import {now} from "moment";
import ScheduleItem from "../../commons/ScheduleItem";

const ExamSchedule = ({startTime, endTime, setStartTime, setEndTime}) => {
    const startTimeInputRef = createRef();
    const endTimeInputRef = createRef();

    const setStartTimeHandler = (startTime) => {
        setStartTime(startTimeInputRef.current.value);
        validateTimes(startTime, endTime);
    };
    const setEndTimeHandler = (endTime) => {
        setEndTime(endTimeInputRef.current.value);
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