import * as React from "react";
import './ModalHeader.css'

const ModalHeader = function ({title, textAlign}) {
    return (
        <div>
            <h1 className="modal-header font-poppins" style={{textAlign}}>
                {title}
            </h1>
        </div>
    )
};

export {ModalHeader};
