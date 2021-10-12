import {useState} from 'react';


const useTextItems = (initialTextItems) => {
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

  const removeTextItem = item => {
    setTextItems(items => items.filter(_item => _item !== item));
  };

  const itemAlreadyExists = item => {
    return textItems.some(_item => _item === item);
  };

  const isIllegalText = item => {
    return !item || /^\s*$/.test(item);
  };

  return {textItems, setTextItems, addTextItem, removeTextItem};
};


export {useTextItems};
