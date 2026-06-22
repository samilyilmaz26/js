import { getbyId, getbyClass } from "./base.js";
export const ElbyId = {
    get: (id) => getbyId(id),
    getInput: (id) => getbyId(id),
    innerHTML: (id) => {
        const element = getbyId(id);
        return element ? element.innerHTML : '';
    },
    innerText: (id) => {
        const element = getbyId(id);
        return element ? element.innerText : '';
    }
};
export const ElbyClass = {
    get: (cls, num = 0) => {
        const elements = getbyClass(cls);
        return elements[num] || null;
    },
    getAll: (cls) => getbyClass(cls),
    forEach: (cls, callback) => {
        Array.from(getbyClass(cls)).forEach(callback);
    }
};
