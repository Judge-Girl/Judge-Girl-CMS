import {useState} from "react"
import {removeIf} from "../../utils/array";


const useUploads = (initialFiles = []) => {
    const [files, setFiles] = useState(initialFiles);

    const addFiles = newFiles => {
        setFiles(files => [...newFiles,
            ...removeIf(files, // replace the old files that have duplicate filenames
            file => newFiles.find(f => f.name === file.name))]);
    };

    const removeFile = filename => {
        setFiles(files => files.filter(f => f.name !== filename));
    };

    const reset = () => {
        setFiles(initialFiles);
    };

    return {files, setFiles, addFiles, removeFile, reset};
};

export {useUploads};
