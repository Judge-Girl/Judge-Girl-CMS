export function removeIf(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        const removed = array.find(predicate);
        const index = array.indexOf(removed);
        array.splice(index, 1);
    }
    return array
}