import {AiOutlineClose} from "react-icons/ai";
import "../../../commons/TextInputForm/FixedTextInputField.scss";

function ProvidedCodeItems({files, removeFile}) {
    return files.map((file) => (
        <div className="fixed-text-input-field">
            <div className="text-item">{file.name}</div>
            <div className="text-item-remove-button"
                 onClick={() => removeFile(file)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
}

export default ProvidedCodeItems;
