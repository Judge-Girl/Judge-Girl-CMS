import * as React from "react";
import './ModalHeader.css'

const ModalHeader = function ({title}) {
    return (
        <div>
            <h1 className="modal-header font-poppins">
                {title}
            </h1>
        </div>
    )
};

export {ModalHeader};
