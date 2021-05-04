import * as moment from "moment";

function isLegalText(text, textList) {
    return !text || /^\s*$/.test(text) || textList.some(e => e.text === text);
}

function formatDate(timestamp) {
    return moment(timestamp).format('YYYY/MM/DD  h:mm A');
}

export {isLegalText, formatDate}