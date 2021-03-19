import React, {useState} from 'react';
import '../ProblemEditor.css';
import ProvidedCode from "./ProvidedCode";

function ProvidedCodeForm () {
    const [files, setFiles] = useState([]);

    const addFile = (event) => {
        const newFiles = [event.target.files[0], ...files];
        setFiles(newFiles);
    };

    const removeFile = fileName => {
        const removeAttr = [...files].filter(file => file.name !== fileName);
        setFiles(removeAttr);
    };

    return (
        <div>
            <ProvidedCode files={files} removeFile={removeFile} />
            <label className="provided-code-button">
                <i>Upload Provided Code +</i>
                <input
                    type="file"
                    name="file"
                    onChange={addFile}
                    className="provided-code-upload"
                />
            </label>
        </div>
    );
}

export default ProvidedCodeForm;