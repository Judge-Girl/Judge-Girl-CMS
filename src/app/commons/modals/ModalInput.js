import * as React from "react";
import './ModalInput.css';

export function ModalInput({
                               type = "text", value, inputRef,
                               placeholder, placeholderTextAlign,
                               height, fontSize,
                               labelText, labelFontSize,
                               onChange = e => {
                               }, required = true
                           }) {
    return (
        <div className="mt-3">
            {labelText ? <label className="modal-input-label" style={{fontSize: labelFontSize}}>{labelText}</label> : ""}
            <input ref={inputRef} className={`modal-input placeholder-align-${placeholderTextAlign}`}
                   type={type} value={value} placeholder={placeholder}
                   style={{height, fontSize}}
                   onChange={onChange} required={required}/>
        </div>
    );
}
