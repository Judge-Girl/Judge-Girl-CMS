import {useState} from "react";
import {isLegalText} from "../../utils/utils";


const useTags = function () {
    const [tags, setTags] = useState([]);
    const addTags = tag => {
        if (isLegalText(tag.text, tags)) {
            return;
        }

        const newTags = [tag, ...tags];

        setTags(newTags);
    };

    const removeTag = id => {
        const removeAttr = [...tags].filter(tag => tag.id !== id);
        setTags(removeAttr);
    };

    return {tags, setTags, addTags, removeTag}
};

export {useTags};
