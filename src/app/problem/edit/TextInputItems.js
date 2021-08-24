import {AiOutlineClose} from "react-icons/ai";
import './TextInputItems.scss';


const TextInputItems = ({items, removeItem}) => {
    return items.map((tag) => (
        <div key={tag.id} className="tag-item">
            <div style={{marginRight: "25px"}}>{tag.name}</div>
            <AiOutlineClose className='delete-icon' size={15}
                            style={{height: "100%"}}
                            onClick={() => removeItem(tag)}/>
        </div>
    ));
};

export {TextInputItems};