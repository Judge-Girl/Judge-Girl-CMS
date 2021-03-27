import * as React from "react";
import {SubtitleLine} from "../commons/TitleLine";
import "./CreateExamModel.css";
import {useState} from "react";
import * as moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {examService} from "../../services/services";
import {createRef} from "react";
import {now} from "moment";
import {renderModal} from "../commons/modals/modal";


function formatDate(time) {
    return moment(time).format('YYYY-MM-DDThh:mm');
}

function scheduleItem(inputRef, label, inputName, timeValue, setTime, minTime) {
    return (
        <div key={inputName} className="is-flex is-justify-content-center py-3 mr-2 schedule-item">
            <FontAwesomeIcon className="dot" icon={faCircle}/>
            <label className="ml-2 is-vcentered">{label}</label>
            <input className="ml-4" type="datetime-local"
                   name={inputName} value={formatDate(timeValue)}
                   onChange={e => setTime(new Date(e.target.value))}
                   min={formatDate(minTime)} ref={inputRef}
            />
        </div>
    )
}


const CreateExamModal = ({show, onClose, onExamCreated}) => {
    const oneHour = 60 * 60 * 1000;
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState(now() + oneHour);
    const [endTime, setEndTime] = useState(now() + oneHour * 2);
    const closeIconRef = createRef();
    const formRef = createRef(), nameInputRef = createRef(), startTimeInputRef = createRef(),
        endTimeInputRef = createRef();

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

    const setStartTimeHandler = (startTime) => {
        setStartTime(startTime);
        validateTimes(startTime, endTime);
    };
    const setEndTimeHandler = (endTime) => {
        setEndTime(endTime);
        validateTimes(startTime, endTime);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = formRef.current;

        // validation
        if (form.checkValidity()) {
            examService.createExam({name, startTime, endTime})
                .then(exam => {
                    onExamCreated(exam);
                    closeIconRef.current.click(); // close the modal

                    // reset
                    setName('');
                    setStartTime(now() + oneHour);
                    setEndTime(now() + oneHour * 2);
                });
        } else {
            form.reportValidity();
        }

    };

    return renderModal({
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="has-text-centered">
                    <SubtitleLine title="Exam Name"/>
                    <input ref={nameInputRef} type="text" className="mt-3 mb-5 full-width" name="examName"
                           value={name} id="exam-name-input" onChange={e => setName(e.target.value)} required/>

                    <SubtitleLine title="Schedule"/>

                    {scheduleItem(startTimeInputRef, 'Start Time', 'startTime', startTime, setStartTimeHandler, new Date())}
                    {scheduleItem(endTimeInputRef, 'End Time', 'endTime', endTime, setEndTimeHandler, new Date(startTime))}

                    {/* TODO: white-list */}

                    <button className="button ml-2 mt-3 my-green-btn" id="create-btn">Create Exam</button>
                </div>
            </form>
        )
    })

};


export {CreateExamModal}
