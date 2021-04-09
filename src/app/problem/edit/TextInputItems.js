import {AiOutlineClose} from "react-icons/ai";
import './TextInputItems.css';

const TextInputItems = ({items, removeItems}) => {
    return items.map((tag, index) => (
        <div key={tag.id} className="tag-item">
            <div key={tag.id}>
                {tag.text}
            </div>
            <AiOutlineClose
                onClick={() => removeItems(tag.id)}
                className='delete-icon'
            />
        </div>

    ));
};

export {TextInputItems};