import {useState} from "react";


const useTags = () => {
    const [tags, setTags] = useState([]);

    const addTag = tag => {
        if (tagAlreadyExists(tag, tags) || isIllegalText(tag)) {
            console.log(`[addTag] tag ${tag} not added.`);
            return;
        }
        // See: https://stackoverflow.com/a/26254086/5290519.
        setTags(tags => [tag, ...tags]);
    };

    const removeTag = tag => {
        setTags(tags => tags.filter(_tag => _tag.id !== tag.id));
    };

    const tagAlreadyExists = (tag) => {
        return tags.some(_tag => _tag.name === tag.name);
    };

    const isIllegalText = (tag) => {
        return !tag.name || /^\s*$/.test(tag.name);
    };

    return {tags, setTags, addTag, removeTag};
};

export {useTags};