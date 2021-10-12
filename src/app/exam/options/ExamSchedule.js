import {SubtitleLine} from '../../commons/titles/TitleLine';
import React, {createRef, forwardRef, useImperativeHandle} from 'react';
import ScheduleItem from '../../commons/ScheduleItem';
import moment from 'moment';

const ExamSchedule = ({ scheduleRef, startTime, endTime, setStartTime, setEndTime }) => {
	const startTimeInputRef = createRef();
	const endTimeInputRef = createRef();

	const setStartTimeHandler = () => {
		setStartTime(startTimeInputRef.current.value);
	};
	const setEndTimeHandler = () => {
		setEndTime(endTimeInputRef.current.value);
	};

	useImperativeHandle(scheduleRef, () => ({
		validateTimes
	}));

	const validateTimes = (startTime, endTime) => {
		if (moment(endTime).isBefore(startTime) || moment(endTime).isSame(startTime)) {
			endTimeInputRef.current.setCustomValidity('The exam\'s end time must come after the start time.');
			endTimeInputRef.current.reportValidity();
			return false;
		} else {
			startTimeInputRef.current.setCustomValidity('');
			endTimeInputRef.current.setCustomValidity('');
			return true;
		}
	};

	return (
		<>
			<SubtitleLine title={'Schedule'} />
			<ScheduleItem inputRef={startTimeInputRef} label="Start Time" inputName="startTime" timeValue={startTime}
				setTime={setStartTimeHandler} />
			<ScheduleItem inputRef={endTimeInputRef} label="End Time" inputName="endTime" timeValue={endTime}
				setTime={setEndTimeHandler} minTime={new Date(startTime)} />
		</>
	);
};


export default forwardRef(ExamSchedule);
