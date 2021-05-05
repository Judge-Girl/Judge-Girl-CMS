import * as moment from "moment";

function isLegalText(text, textList) {
    return !text || /^\s*$/.test(text) || textList.some(e => e.text === text);
}

function formatDate(timestamp) {
    return moment(timestamp).format('YYYY-MM-DDTHH:mm');
}

function displayDate(timestamp) {
    return moment(timestamp).format('YYYY/MM/DD  hh:mm A')
}

export {isLegalText, formatDate, displayDate}