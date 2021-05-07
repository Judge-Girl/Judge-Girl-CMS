import * as React from "react";
import './ModalHeader.css'

const ModalHeader = function ({ title, style }) {
    const { textAlign, color } = style

    return (
        <div>
            <h1 className="modal-header font-poppins" style={{
                textAlign: textAlign,
                color: color
            }}>
                {title}
            </h1>
        </div>
    )
};

export {ModalHeader};
