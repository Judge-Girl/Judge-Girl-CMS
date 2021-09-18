import {AiOutlineClose} from "react-icons/ai";


const TextInputItems = ({items, removeItem}) => {
    return items.map((textInputContent) => (
        <div key={textInputContent.id} className="tag-item">
            <div className="tag-content">{textInputContent.text}</div>
            <div className="tag-button"
                 onClick={() => removeItem(textInputContent)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
};

export {TextInputItems};
