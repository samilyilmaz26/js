export  function getbyId(id) {
    if (!id) throw new Error('ID parameter is required');
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with ID "${id}" not found`);
    }
    return element;
}
export function getbyTag(tag) {
    if (!tag) throw new Error('Tag parameter is required');
    return document.getElementsByTagName(tag);
}
export function getbyClass(cls) {
    if (!cls) throw new Error('Class parameter is required');
    return document.getElementsByClassName(cls);
}
export function getbyQry(selector) {
    if (!selector) throw new Error('Selector parameter is required');
    try {
        return document.querySelector(selector);
    } catch (error) {
        throw new Error(`Invalid selector: ${selector}`);
    }
}
export function getbyQryAll(selector) {
    if (!selector) throw new Error('Selector parameter is required');
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        throw new Error(`Invalid selector: ${selector}`);
    }
}

/**
 * A decorator that wraps a function with try-catch error handling
 * @param {Function} target - The function to be decorated
 * @param {string} name - The name of the function
 * @returns {Function} - The decorated function
 */
export function tryCatchDec(target, name) {
    return async function (...args) {
        try {
            return await target.apply(this, args);
        } catch (error) {
            console.error(`Error in ${name}:`, error);
            alert(`Error in ${name}: ${error.message}`);
            return null;
        }
    };
}
 