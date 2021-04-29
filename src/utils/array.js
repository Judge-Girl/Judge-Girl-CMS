export function removeIf(array, predicate) {
    const removed = array.find(predicate);
    const index = array.indexOf(removed);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array
}