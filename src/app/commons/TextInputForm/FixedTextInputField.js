import {AiOutlineClose} from "react-icons/ai";
import "./FixedTextInputField.scss"

const FixedTextInputField = ({items, removeItem}) => {
    return items.map((textItem) => (
        <div key={textItem.id} className="fixed-text-input-field">
            <div className="text-item">{textItem.text}</div>
            <div className="text-item-remove-button"
                 onClick={() => removeItem(textItem)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
};

export {FixedTextInputField};
