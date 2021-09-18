import {useState} from "react";
import {getStringHash} from "../../utils/utils";


const useTags = (initialState = []) => {
    const [tags, setTags] = useState(initialState);

    const addTag = tag => {
        if (tagAlreadyExists(tag, tags) || isIllegalText(tag)) {
            console.log(`[addTag] tag ${tag} not added.`);
            return;
        }
        /**
         *  This is used to resolve the bug pointed out in issue#172.
         *  See: https://stackoverflow.com/a/26254086/5290519.
         */
        setTags(tags => [tag, ...tags]);
    };

    const replaceTags = newTags => {
        setTags(newTags)
    }

    const removeTag = tag => {
        setTags(tags => tags.filter(_tag => _tag.id !== tag.id));
    };

    const tagAlreadyExists = (tag) => {
        return tags.some(_tag => _tag.name === tag.name);
    };

    const isIllegalText = (tag) => {
        return !tag.name || /^\s*$/.test(tag.name);
    };

    return {tags, setTags, addTag, removeTag, replaceTags};
};

class Tag {
    constructor(tagName) {
        this.name = tagName
        this.id = getStringHash(tagName)
    }
}

export {useTags, Tag};
