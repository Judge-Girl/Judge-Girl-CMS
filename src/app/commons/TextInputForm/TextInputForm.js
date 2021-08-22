import {useState} from "react";
import './TextInputForm.css';

const TextInputForm = ({placeholder, onSubmit, style}) => {
    const [input, setInput] = useState('');
    const [tagId, setTagId] = useState(0);

    const handleChange = e => {
        setInput(e.target.value);
    };

    const onFormSubmit = e => {
        e.preventDefault();

        onSubmit({id: tagId, text: input});

        setInput('');
        setTagId(tagId + 1);
    };

    return (
        <div className="text-input-form">
            <form className="tag-form" onSubmit={onFormSubmit} style={{display: "table"}}>
                <p style={{display: "table-cell", ...style}}>
                    <input
                        type='text'
                        placeholder={placeholder}
                        value={input}
                        name="text"
                        className="tag-input control"
                        onChange={handleChange}
                        style={{width: "100%"}}
                    />
                </p>
                <AddButton title={"+"}/>
            </form>
        </div>
    );
};

const AddButton = ({title = "+"}) => {
    return (
        <button className="control tag-button">
            {title}
        </button>
    );
};

export {TextInputForm, AddButton};
