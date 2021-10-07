import {AiOutlineClose} from "react-icons/ai";
import "./FixedTextInputField.scss"

const FixedTextInputField = ({items, removeItem}) => {
    return items.map((textItem) => (
        <div key={textItem} className="fixed-text-input-field" style={{width: "16rem"}}>
            <div className="text-item">{textItem}</div>
            <div className="text-item-remove-button"
                 onClick={() => removeItem(textItem)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
};

export {FixedTextInputField};
