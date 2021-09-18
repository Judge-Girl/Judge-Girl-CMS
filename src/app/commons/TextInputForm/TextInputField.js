import {useRef, useState} from "react";
import './TextInputForm.css';
import {TextInputContent} from "../../usecases/TagUseCase";


const TextInputField = ({placeholder, onSubmit, buttonTitle = "+", style}) => {
    const [text, setText] = useState("");
    const inputRef = useRef();

    const onFormSubmit = e => {
        e.preventDefault();
        onSubmit(new TextInputContent(text));
        setText("");
        inputRef.current.focus();
    };

    const onChangeInput = e => setText(e.target.value);

    return (
        <div className="text-input-form">
            <form className="tag-form"
                  onSubmit={onFormSubmit} style={{display: "flex", alignItems: "center"}}>
                <p style={{display: "table-cell", ...style}}>
                    <input type='text' name="text" className="tag-input control"
                           ref={inputRef}
                           placeholder={placeholder}
                           value={text} onChange={onChangeInput}
                           style={{width: "100%"}}/>
                </p>
                <button className="control tag-button"
                        style={{cursor: "pointer"}}>
                    {buttonTitle}
                </button>
            </form>
        </div>
    );
};

export {TextInputField};
