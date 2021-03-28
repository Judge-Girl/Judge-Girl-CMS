import './ProblemEditorPage.css';
import * as React from "react";
import {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";

const InputForm = ({placeholder, onSubmit}) => {
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
                <button className="control tag-button">
                    +
                </button>
            </div>
        </form>
    );
};

const Items = ({items, removeItems}) => {
    return items.map((tag, index) => (
        <div key={tag.id} className="tag-item" >
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

const EditorButton = ({
                          text, buttonColor, width=356,
                          height=46, borderRadius=10, fontColor
}) => {
    return (
        <div>
            <button
                className="button"
                style={{
                    background: buttonColor, width: width, height: height,
                    borderRadius: 10, marginBottom: 10, padding: 10, color: fontColor,
                    display: "flex", fontFamily: "Poppins",
                }}
            >
                {text}
            </button>
        </div>
    );
};


export {InputForm, EditorButton, Items};
