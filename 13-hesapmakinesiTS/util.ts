import { getbyId, getbyClass, getbyTag, getbyQry, getbyQryAll } from "./base.js";

export const ElbyId = {
    get: (id: string): HTMLElement | null => getbyId(id),
    
    // Specifically for Input elements
    getInput: (id: string): HTMLInputElement | null => getbyId(id) as HTMLInputElement,

    innerHTML: (id: string): string => {
        const element = getbyId(id);
        return element ? element.innerHTML : '';
    },
    innerText: (id: string): string => {
        const element = getbyId(id);
        return element ? element.innerText : '';
    }
};

export const ElbyClass = {
    get: (cls: string, num: number = 0): Element | null => {
        const elements = getbyClass(cls);
        return elements[num] || null;
    },
    getAll: (cls: string): HTMLCollectionOf<Element> => getbyClass(cls),
    forEach: (cls: string, callback: (el: Element, index: number) => void): void => {
        Array.from(getbyClass(cls)).forEach(callback);
    }
};

// ... Similar patterns apply to ElbyTag and ElbyQry