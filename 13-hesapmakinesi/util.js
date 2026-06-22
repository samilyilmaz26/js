import { getbyId, getbyClass, getbyTag, getbyQry, getbyQryAll } from "./base.js";

 
export const ElbyId = {
    get: (id) => {
        return getbyId(id);
    },
    innerHTML: (id) => {
        const element = getbyId(id);
        return element ? element.innerHTML : '';
    },
    innerText: (id) => {
        const element = getbyId(id);
        return element ? element.innerText : '';
    },
    textContent: (id) => {
        const element = getbyId(id);
        return element ? element.textContent : '';
    },
    // setValue: (id, value) => {
    //     const element = getbyId(id);
    //     if (element) element.value = value;
    // },
    // addClass: (id, className) => {
    //     const element = getbyId(id);
    //     if (element) element.classList.add(className);
    // },
    // removeClass: (id, className) => {
    //     const element = getbyId(id);
    //     if (element) element.classList.remove(className);
    // }
};

/**
 * Utility functions for element manipulation by class name
 */
export const ElbyClass = {
    get: (cls, num = 0) => {
        const elements = getbyClass(cls);
        return elements[num] || null;
    },
    getAll: (cls) => {
        return getbyClass(cls);
    },
    innerHTML: (cls, num = 0) => {
        const element = ElbyClass.get(cls, num);
        return element ? element.innerHTML : '';
    },
    innerText: (cls, num = 0) => {
        const element = ElbyClass.get(cls, num);
        return element ? element.innerText : '';
    },
    textContent: (cls, num = 0) => {
        const element = ElbyClass.get(cls, num);
        return element ? element.textContent : '';
    },
    forEach: (cls, callback) => {
        Array.from(getbyClass(cls)).forEach(callback);
    }
};

/**
 * Utility functions for element manipulation by tag name
 */
export const ElbyTag = {
    get: (tag, num = 0) => {
        const elements = getbyTag(tag);
        return elements[num] || null;
    },
    getAll: (tag) => {
        return getbyTag(tag);
    },
    innerHTML: (tag, num = 0) => {
        const element = ElbyTag.get(tag, num);
        return element ? element.innerHTML : '';
    },
    innerText: (tag, num = 0) => {
        const element = ElbyTag.get(tag, num);
        return element ? element.innerText : '';
    },
    textContent: (tag, num = 0) => {
        const element = ElbyTag.get(tag, num);
        return element ? element.textContent : '';
    },
    forEach: (tag, callback) => {
        Array.from(getbyTag(tag)).forEach(callback);
    }
};

/**
 * Utility functions for element manipulation using querySelector
 */
export const ElbyQry = {
    get: (selector) => {
        return getbyQry(selector);
    },
    innerHTML: (selector) => {
        const element = getbyQry(selector);
        return element ? element.innerHTML : '';
    },
    innerText: (selector) => {
        const element = getbyQry(selector);
        return element ? element.innerText : '';
    },
    textContent: (selector) => {
        const element = getbyQry(selector);
        return element ? element.textContent : '';
    },
    setValue: (selector, value) => {
        const element = getbyQry(selector);
        if (element) element.value = value;
    },
    addClass: (selector, className) => {
        const element = getbyQry(selector);
        if (element) element.classList.add(className);
    },
    removeClass: (selector, className) => {
        const element = getbyQry(selector);
        if (element) element.classList.remove(className);
    }
};

/**
 * Utility functions for element manipulation using QrySelectorAll
 */
export const ElbyQryAll = {
    get: (selector, num = 0) => {
        const elements = getbyQryAll(selector);
        return elements[num] || null;
    },
    getAll: (selector) => {
        return getbyQryAll(selector);
    },
    innerHTML: (selector, num = 0) => {
        const element = ElbyQryAll.get(selector, num);
        return element ? element.innerHTML : '';
    },
    innerText: (selector, num = 0) => {
        const element = ElbyQryAll.get(selector, num);
        return element ? element.innerText : '';
    },
    textContent: (selector, num = 0) => {
        const element = ElbyQryAll.get(selector, num);
        return element ? element.textContent : '';
    },
    forEach: (selector, callback) => {
        Array.from(getbyQryAll(selector)).forEach(callback);
    }
};

