import {useState} from "react";
import {getStringHash} from "../../utils/utils";


const useTextItems = (initialTextItems = []) => {
    const [textItems, setTextItems] = useState(initialTextItems);

    const addTextItem = item => {
        if (itemAlreadyExists(item, textItems) || isIllegalText(item)) {
            console.log(`[addTextItem] item ${item} not added.`);
            return;
        }
        /**
         *  This is used to resolve the bug pointed out in issue#172.
         *  See: https://stackoverflow.com/a/26254086/5290519.
         */
        setTextItems(items => [item, ...items]);
    };

    const replaceTextItem = newItems => {
        setTextItems(newItems);
    };

    const removeTextItem = item => {
        setTextItems(items => items.filter(_item => _item.id !== item.id));
    };

    const itemAlreadyExists = item => {
        return textItems.some(_item => _item.text === item.text);
    };

    const isIllegalText = item => {
        return !item.text || /^\s*$/.test(item.text);
    };

    return {textItems, setTextItems, addTextItem, removeTextItem, replaceTextItem};
};

class TextItem {
    constructor(text) {
        this.text = text;
        this.id = getStringHash(text);
    }
}

export {useTextItems, TextItem};
