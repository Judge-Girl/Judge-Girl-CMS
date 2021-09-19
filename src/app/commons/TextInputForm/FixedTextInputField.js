import {AiOutlineClose} from "react-icons/ai";

const FixedTextInputField = ({items, removeItem, iconSize}) => {
    return items.map((textItem) => (
        <div key={textItem.id} className="text-item">
            <div className="text-item-line">{textItem.text}</div>
            <div className="text-item-remove-button"
                 onClick={() => removeItem(textItem)}>
                <AiOutlineClose size={iconSize}/>
            </div>
        </div>
    ));
};

export {FixedTextInputField};
