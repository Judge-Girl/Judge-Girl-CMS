import {useState} from "react";
import {getStringHash} from "../../utils/utils";


const useTextInputContent = (initialTextInputContent = []) => {
    const [textInputContents, setTextInputContents] = useState(initialTextInputContent);

    const addTextInputContent = content => {
        if (contentAlreadyExists(content, textInputContents) || isIllegalText(content)) {
            console.log(`[addTextInputContent] content ${content} not added.`);
            return;
        }
        /**
         *  This is used to resolve the bug pointed out in issue#172.
         *  See: https://stackoverflow.com/a/26254086/5290519.
         */
        setTextInputContents(contents => [content, ...contents]);
    };

    const replaceTextInputContent = newContents => {
        setTextInputContents(newContents)
    }

    const removeTextInputContent = content => {
        setTextInputContents(contents => contents.filter(_content => _content.id !== content.id));
    };

    const contentAlreadyExists = (content) => {
        return textInputContents.some(_content => _content.text === content.text);
    };

    const isIllegalText = (content) => {
        return !content.text || /^\s*$/.test(content.text);
    };

    return {textInputContents, setTextInputContents, addTextInputContent, removeTextInputContent, replaceTextInputContent};
};

class TextInputContent {
    constructor(text) {
        this.text = text
        this.id = getStringHash(text)
    }
}

export {useTextInputContent, TextInputContent};
