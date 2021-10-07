export const GB = (bytes) => {
    return MB(bytes) / 1024;
};

export const MB = (unit) => {
    return KB(unit * 1024);
};

export const KB = (unit) => {
    return unit * 1024; // Unit: Bytes
};

export const MIN = (unit) => {
    return SECOND(unit * 60);
};

export const SECOND = (unit) => {
    return unit * 1000;
};
