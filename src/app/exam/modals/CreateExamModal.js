import * as React from 'react';
import {createRef, useState} from 'react';
import {SubtitleLine} from '../../commons/titles/TitleLine';
import moment, {now} from 'moment';
import {examService} from '../../../services/services';
import {renderModal} from '../../commons/modals/modal';
import {ModalInput} from '../../commons/modals/ModalInput';
import ScheduleItem from '../../commons/ScheduleItem';
import {SECS_ONE_HOUR} from '../../../utils/times';
import './CreateExamModel.css';


const CreateExamModal = ({show, onClose, onExamCreated}) => {
  const [name, setName] = useState(undefined);
  const nameInputRef = createRef();
  const [startTime, setStartTime] = useState(now() + SECS_ONE_HOUR);
  const startTimeInputRef = createRef();
  const [endTime, setEndTime] = useState(now() + SECS_ONE_HOUR * 2);
  const endTimeInputRef = createRef();
  const formRef = createRef();
  const closeIconRef = createRef();

  const validateTimes = (startTime, endTime) => {
    if (moment(startTime).isBefore(now()) || moment(now()).isSame(startTime)) {
      startTimeInputRef.current.setCustomValidity('The exam\'s start time must come after the current time.');
    } else if (moment(endTime).isBefore(startTime) || moment(startTime).isSame(endTime)) {
      endTimeInputRef.current.setCustomValidity('The exam\'s end time must come after the start time.');
    } else {
      startTimeInputRef.current.setCustomValidity('');
      endTimeInputRef.current.setCustomValidity('');
    }
  };

  const setStartTimeHandler = (startTime) => {
    setStartTime(startTime);
    validateTimes(startTime, endTime);
  };
  const setEndTimeHandler = (endTime) => {
    setEndTime(endTime);
    validateTimes(startTime, endTime);
  };

  const resetState = () => {
    setName(null);
    setStartTime(now() + SECS_ONE_HOUR);
    setEndTime(now() + SECS_ONE_HOUR * 2);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = formRef.current;

    // validation
    if (form.checkValidity()) {
      examService.createExam({name, startTime, endTime})
        .then(exam => onExamCreated(exam));
      resetState();
      closeIconRef.current.click();
    } else {
      form.reportValidity();
    }

  };

  return renderModal({
    modalClassName: 'create-exam-modal',
    modalWidth: '465px',
    show, onClose, closeIconRef,
    contentRendering: () => (
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="p-5 has-text-centered">
          <SubtitleLine title="Exam Name"/>
          <ModalInput ref={nameInputRef} value={name} required={true} fontSize="20px" height="41px"
            onChange={e => setName(e.target.value)}/>
          <SubtitleLine title="Schedule"/>
          <ScheduleItem inputRef={startTimeInputRef} label='Start Time' inputName='startTime'
            timeValue={startTime} setTime={setStartTimeHandler}/>
          <ScheduleItem inputRef={endTimeInputRef} label='End Time' inputName='endTime'
            timeValue={endTime} setTime={setEndTimeHandler} minTime={new Date(startTime)}/>
          {/* TODO: white-list */}
          <button className="button ml-2 mt-3 my-green-btn" id="create-btn">Create Exam</button>
        </div>
      </form>
    )
  });

};


export {CreateExamModal};
