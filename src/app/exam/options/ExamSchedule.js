import { SubtitleLine } from "../../commons/titles/TitleLine";
import React, { createRef, useImperativeHandle, forwardRef } from "react";
import { now } from "moment";
import ScheduleItem from "../../commons/ScheduleItem";

const ExamSchedule = ({ scheduleRef, startTime, endTime, setStartTime, setEndTime }) => {
    const startTimeInputRef = createRef()
    const endTimeInputRef = createRef()

    const setStartTimeHandler = () => {
        setStartTime(startTimeInputRef.current.value);
    };
    const setEndTimeHandler = () => {
        setEndTime(endTimeInputRef.current.value);
    };

    useImperativeHandle(scheduleRef, () => ({
        validateTimes: validateTimes
    }));

    const validateTimes = (startTime, endTime) => {
        if (now() >= startTime) {
            startTimeInputRef.current.setCustomValidity("The exam's start time must come after the current time.");
            startTimeInputRef.current.reportValidity();
            return false;
        } else if (startTime >= endTime) {
            endTimeInputRef.current.setCustomValidity("The exam's end time must come after the start time.");
            endTimeInputRef.current.reportValidity();
            return false;
        } else {
            startTimeInputRef.current.setCustomValidity("");
            endTimeInputRef.current.setCustomValidity("");
            return true;
        }
    };

    return (
        <>
            <SubtitleLine title={"Schedule"} />
            <ScheduleItem inputRef={startTimeInputRef} label="Start Time" inputName="startTime" timeValue={startTime}
                setTime={setStartTimeHandler} minTime={new Date()} />
            <ScheduleItem inputRef={endTimeInputRef} label="End Time" inputName="endTime" timeValue={endTime}
                setTime={setEndTimeHandler} minTime={new Date(startTime)} />
        </>
    )
}


export default forwardRef(ExamSchedule);