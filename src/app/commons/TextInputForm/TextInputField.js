import {useRef, useState} from "react";
import './TextInputForm.css';
import {Tag} from "../../usecases/TagUseCase";


const TextInputField = ({placeholder, onSubmit, buttonTitle = "+", style}) => {
    const [tagName, setTagName] = useState("");
    const inputRef = useRef();

    const onFormSubmit = e => {
        e.preventDefault();
        onSubmit(new Tag(tagName));
        setTagName("");
        inputRef.current.focus();
    };

    const onChangeInput = e => setTagName(e.target.value);

    return (
        <div className="text-input-form">
            <form className="tag-form"
                  onSubmit={onFormSubmit} style={{display: "flex", alignItems: "center"}}>
                <p style={{display: "table-cell", ...style}}>
                    <input type='text' name="text" className="tag-input control"
                           ref={inputRef}
                           placeholder={placeholder}
                           value={tagName} onChange={onChangeInput}
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
