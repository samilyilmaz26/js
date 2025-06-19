export function getbyId(id) {
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
 