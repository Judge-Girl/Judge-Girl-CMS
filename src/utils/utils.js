import * as moment from "moment";

export const getStringHash = (str) => {
    let hash = 0;
    if (str.length === 0)
        return hash;
    for (let c of str) {
        hash = ((hash << 5) - hash) + c.charCodeAt(0);
        hash |= 0;
    }
    return hash;
};

export const formatDate = (timestamp) => {
    return moment(timestamp).format('YYYY-MM-DDTHH:mm');
};

export const displayDate = (timestamp) => {
    return moment(timestamp).format('YYYY/MM/DD  hh:mm A')
};
