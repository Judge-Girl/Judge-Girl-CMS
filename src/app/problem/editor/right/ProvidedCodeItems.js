import {AiOutlineClose} from "react-icons/ai";
import "./ProvidedCodeItems.scss";

function ProvidedCodeItems({files, removeFile}) {
    return files.map((file) => (
        <div className="provided-code-items">
            <div className="provided-code-file-name">{file.name}</div>
            <div className="provided-code-remove-button"
                 onClick={() => removeFile(file)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
}

export default ProvidedCodeItems;
