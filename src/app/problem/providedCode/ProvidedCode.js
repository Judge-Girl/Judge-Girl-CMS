import React from 'react';
import '../ProblemEditor.css';
import {AiOutlineClose} from "react-icons/ai";

function ProvidedCode({files, removeFile}) {
    return files.map((file) => (
        <div className="provided-code-item">
            <div>
                {file.name}
            </div>
            <AiOutlineClose
                onClick={() => removeFile(file.name)}
                className='delete-icon'
            />
        </div>
    ));
}

export default ProvidedCode;
