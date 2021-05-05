import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {formatDate} from "../../utils/utils";
import * as React from "react";

const ScheduleItem = ({inputRef, label, inputName, timeValue, setTime, minTime}) => {
    return (
        <div key={inputName} className="is-flex is-justify-content-left py-3 mr-2 schedule-item">
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

export default ScheduleItem