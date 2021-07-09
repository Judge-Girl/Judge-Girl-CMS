import {useState} from "react"

const useUploads = function () {
    const [files, setFiles] = useState([]);

    const addFile = (event) => {
        // Cancel button makes event undefined.
        if (!event.target.files[0]) return;
        const newFiles = [event.target.files[0], ...files];
        setFiles(newFiles);
    };

    const removeFile = fileName => {
        const removeAttr = [...files].filter(file => file.name !== fileName);
        setFiles(removeAttr);
    };

    return {files, setFiles, addFile, removeFile};
};

export {useUploads}
