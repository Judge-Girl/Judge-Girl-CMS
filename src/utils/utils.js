import * as moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

function isLegalText(text, textList) {
    return !text || /^\s*$/.test(text) || textList.some(e => e.text === text);
}

function formatDate(timestamp) {
    return moment(timestamp).format('YYYY/MM/DD  h:mm A');
}

function scheduleItem(inputRef, label, inputName, timeValue, setTime, minTime) {
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

export {isLegalText, formatDate, scheduleItem}