import * as React from "react";
import './ModalHeader.css'

const ModalHeader = function ({title, style}) {
    return (
        <div>
            <h1 className="modal-header font-poppins" style={style}>
                {title}
            </h1>
        </div>
    )
};

export {ModalHeader};
