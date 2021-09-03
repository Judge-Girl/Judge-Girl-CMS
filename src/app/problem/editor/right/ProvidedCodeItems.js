import {AiOutlineClose} from "react-icons/ai";

// TODO: Moving the style fields into a separate .scss file.
function ProvidedCodeItems({files, removeFile}) {
    return files.map((file) => (
        <div className="tag-item">
            <div className="tag-content">{file.name}</div>
            <div className="tag-button"
                 onClick={() => removeFile(file)}>
                <AiOutlineClose size={15}/>
            </div>
        </div>
    ));
}

export default ProvidedCodeItems;