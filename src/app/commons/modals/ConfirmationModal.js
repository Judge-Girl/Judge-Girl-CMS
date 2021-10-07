import './ConfirmationModal.scss'
import React, {createRef, useState} from "react";
import {renderModal} from "./modal";
import {ModalHeader} from "./ModalHeader";

/**
 * @typedef ConfirmationModal
 */
const DeleteConfirmationModal = ({title, data, show, onClose, onSubmit}) => {
    return ConfirmationModal({
        title, themeColor: '#E26C65', themeColorDark: '#D84E47',
        data, show, onClose, onSubmit
    })
};


/**
 * @callback callback
 */

/**
 * @callback callback
 * @param {string} title, the title (str) of the modal
 * @param {{title: string, value: string}[]} data, a list of the content items described by title and value
 * @param {string} themeColor the theme color (applies on title and the button's background color)
 * @param {string} themeColorDark the theme dark color (applies on the button:hover)
 * @param {boolean} show, show the modal or not
 * @param {callback} onClose, the callback function when close the modal
 * @param {callback} onSubmit, the callback function when submit the form
 */
const ConfirmationModal = ({title, data, themeColor, themeColorDark,
                               show, onClose, onSubmit}) => {
    const closeIconRef = createRef(), formRef = createRef();
    const [buttonColor, setButtonColor] = useState(themeColor);

    const handleSubmit = e => {
        onSubmit();
        closeIconRef.current.click();
        e.preventDefault();
    };

    return renderModal({
        modalClassName: "confirmation-modal",
        modalWidth: "480px",
        show, onClose, closeIconRef,
        contentRendering: () => (
            <form onSubmit={e => handleSubmit(e)} ref={formRef}>
                <div id="modal" className="font-poppins has-text-centered">
                    <ModalHeader className="header" title={title}
                                 style={{textAlign: "center", color: themeColor}}/>
                    {
                        data?.map(item =>
                            <p key={item.title}>{item.title} <br/>{item.value}</p>
                        )
                    }
                    <button className="button mt-5" id="delete-btn" style={{backgroundColor: buttonColor}}
                            onMouseEnter={() => setButtonColor(themeColorDark)}
                            onMouseLeave={() => setButtonColor(themeColor)}>Delete
                    </button>
                </div>
            </form>
        )
    });
};


export {DeleteConfirmationModal, ConfirmationModal}
