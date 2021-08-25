import {useState} from "react"


const useUploads = () => {
    const [files, setFiles] = useState([]);

    const addFile = e => {
        // Cancel button makes event undefined.
        if (!e.target.files[0]) return;
        setFiles(files => [e.target.files[0], ...files]);
    };

    const removeFile = file => {
        setFiles(files => files.filter(_file => _file.name !== file.name));
    };

    return {files, setFiles, addFile, removeFile};
};

export {useUploads};
