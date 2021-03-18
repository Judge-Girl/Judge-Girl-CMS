export function isLegalText(text, textList) {
    return !text || /^\s*$/.test(text) || textList.some(e => e.text === text);
}

// const isLegalText = (text, textList) => {
//     return !text || /^\s*$/.test(text) || textList.some(e => e.text === text);
// }