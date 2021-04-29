export function removeIf(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            array.splice(i, 1)
        }
    }
}