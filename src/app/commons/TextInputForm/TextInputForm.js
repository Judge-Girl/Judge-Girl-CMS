import {useState} from "react";
import './TextInputForm.css';

const TextInputForm = ({placeholder, onSubmit}) => {
    const [input, setInput] = useState('');
    const [tagId, setTagId] = useState(0);

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit({
            id: tagId, text: input
        });

        setInput('');
        setTagId(tagId + 1);
    };

    return (
        <div className={"text-input-form"}>
            <form className="tag-form" onSubmit={handleSubmit}>
                <div className="field has-addons">
                    <input
                        type='text'
                        placeholder={placeholder}
                        value={input}
                        name="text"
                        className="tag-input control"
                        onChange={handleChange}
                    />
                    <AddButton title={"+"} />
                </div>
            </form>
        </div>
    );
};

const AddButton = ({title="+"}) => {
    return (
        <button className="control tag-button">
            {title}
        </button>
    );
};

export {TextInputForm, AddButton};