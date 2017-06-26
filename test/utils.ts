export const getMethods = (obj) => {
    let original = obj;
    let result = [];

    do{
        result = result.concat(Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(a => a.toString())));
    }while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));

    return result.filter(p => typeof original[p] === 'function')
        .filter((p) => p !== 'constructor')
        .filter((p, i, arr) => (i == 0 || p !== arr[i - 1]))
        .filter((p, i, arr) => arr.indexOf(p) === i);
};