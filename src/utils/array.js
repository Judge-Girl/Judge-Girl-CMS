export function remove(array, objToRemove) {
    removeIf(array, obj => obj === objToRemove)
}

export function removeIf(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            array.splice(i, 1)
        }
    }
}

export function distinct(array) {
    return array.filter((value, index, self) => self.indexOf(value) === index);
}
