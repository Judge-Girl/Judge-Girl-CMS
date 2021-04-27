export function removeItemFromArray(array, item) {
    const removed = array.find(examinee => examinee.email === item);
    const index = array.indexOf(removed);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array
}