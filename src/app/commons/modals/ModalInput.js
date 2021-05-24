import * as React from "react";
import './ModalInput.css';

export const ModalInput = React.forwardRef((
    {
        type = "text", value,
        placeholder, placeholderTextAlign,
        height, fontSize, labelText, labelFontSize,
        onChange = e => {}, required = true
    }, ref) => {
    console.log("DEBUG-----ref2", ref)
    return (
        <div className="mt-3">
            {labelText ?
                <label className="modal-input-label" style={{fontSize: labelFontSize}}>{labelText}</label> : ""}
            <input ref={ref} className={`modal-input placeholder-align-${placeholderTextAlign}`}
                   type={type} value={value} placeholder={placeholder}
                   style={{height, fontSize}}
                   onChange={onChange} required={required}/>
        </div>
    )
})
