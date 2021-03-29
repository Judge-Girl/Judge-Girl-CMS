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
                <AddButton title={"+"} />
            </div>
        </form>
    );
};

const AddButton = ({title="+"}) => {
    return (
        <button className="control tag-button">
            {title}
        </button>
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

const InputBox = ({type = "text", className = "input-box"}) => {
    return (
        <input type={type} className={className} />
    );
};

const InlineInputBox = ({title = "title"}) => {
    return (
        <li>
            <span>{title}</span>
            <InputBox type="text" className="input-box" />
        </li>
    )
};

const UploadFileButton = ({
                              title="title", onChange="onChange",
                              width, height, buttonColor="buttonColor",
                              borderRadius=10, fontWeight=600,
                              fontSize=15, lineHeight = 22,
                              fontColor= "white"
}) => {
    return (
        <label
            style={{
            width: width, height: height, background: buttonColor, borderRadius: borderRadius,
            fontWeight: fontWeight, fontSize: fontSize, lineHeight: lineHeight, color: fontColor,
            display: "flex", flexDirection: "row", justifyContent: "center",
            alignItems: "center", padding: "5 10",
        }}
            className="provided-code-button"
        >
            <i>{title}</i>
            <input
                type="file"
                name="file"
                onChange={onChange}
                className="original-upload-button"
            />
        </label>
    );
};


export {InputForm, AddButton, EditorButton, Items, InputBox, InlineInputBox, UploadFileButton};
