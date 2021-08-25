import {AiOutlineClose} from "react-icons/ai";
import './TextInputItems.scss';


const TextInputItems = ({items, removeItem}) => {
    return items.map((tag) => (
        <div key={tag.id} className="tag-item">
            <div className="tag-content">{tag.name}</div>
            <div className="tag-button"
                 onClick={() => removeItem(tag)}>
                <AiOutlineClose size={15}
                                style={{alignSelf: "center"}}/>
            </div>
        </div>
    ));
};

export {TextInputItems};