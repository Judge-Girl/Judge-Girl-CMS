import {AiOutlineClose} from "react-icons/ai";

// TODO: Moving the style fields into a separate .scss file.
function ProvidedCodeItems({files, removeFile}) {
    return files.map((file) => (
        <div className="text-item">
            <div className="text-item-line">{file.name}</div>
            <div className="text-item-remove-button"
                 onClick={() => removeFile(file)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
}

export default ProvidedCodeItems;
