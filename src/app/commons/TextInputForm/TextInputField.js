import {useState} from "react";
import {getStringHash} from "../../../utils/utils";
import './TextInputForm.css';


const TextInputField = ({
    placeholder, onSubmit,
    buttonTitle="+",
    style
}) => {
    const [tagName, setTagName] = useState("");

    const onFormSubmit = e => {
        e.preventDefault();
        onSubmit({
            id: getStringHash(tagName),
            name: tagName
        });
    };

    const onChangeInput = e => {
        setTagName(e.target.value);
    };

    return (
        <div className="text-input-form">
            <form className="tag-form" onSubmit={onFormSubmit} style={{display: "flex", alignItems: "center"}}>
                <p style={{display: "table-cell", ...style}}>
                    <input type='text' name="text" className="tag-input control"
                           placeholder={placeholder}
                           value={tagName} onChange={onChangeInput}
                           style={{width: "100%"}}/>
                </p>
                <button className="control tag-button">{buttonTitle}</button>
            </form>
        </div>
    );
};

export {TextInputField};
