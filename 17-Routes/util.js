import {
  getbyId,
  getbyClass,
  getbyTag,
  getbyQry,
  getbyQryAll,
  tryCatchDec
} from "./base.js";

export const ElbyId = {
  get: (id) => {
    return getbyId(id);
  },
  innerHTML: (id) => {
    const element = getbyId(id);
    return element ? element.innerHTML : "";
  },
  innerText: (id) => {
    const element = getbyId(id);
    return element ? element.innerText : "";
  },
  textContent: (id) => {
    const element = getbyId(id);
    return element ? element.textContent : "";
  },
  value: (id) => {
    const element = getbyId(id);
    return element ? element.value : "";
  },
  setValue: (id, value) => {
      const element = getbyId(id);
      if (element) element.value = value;
  },
  addClass: (id, className) => {
      const element = getbyId(id);
      if (element) element.classList.add(className);
  },
  removeClass: (id, className) => {
      const element = getbyId(id);
      if (element) element.classList.remove(className);
  }
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
    return element ? element.innerHTML : "";
  },
  innerText: (cls, num = 0) => {
    const element = ElbyClass.get(cls, num);
    return element ? element.innerText : "";
  },
  textContent: (cls, num = 0) => {
    const element = ElbyClass.get(cls, num);
    return element ? element.textContent : "";
  },
  forEach: (cls, callback) => {
    Array.from(getbyClass(cls)).forEach(callback);
  },
  value: (cls, num = 0) => {
    const element = ElbyClass.get(cls, num);
    return element ? element.value : "";
  },
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
    return element ? element.innerHTML : "";
  },
  innerText: (tag, num = 0) => {
    const element = ElbyTag.get(tag, num);
    return element ? element.innerText : "";
  },
  textContent: (tag, num = 0) => {
    const element = ElbyTag.get(tag, num);
    return element ? element.textContent : "";
  },
  forEach: (tag, callback) => {
    Array.from(getbyTag(tag)).forEach(callback);
  },
  value: (tag, num = 0) => {
    const element = ElbyTag.get(tag, num);
    return element ? element.value : "";
  },
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
    return element ? element.innerHTML : "";
  },
  innerText: (selector) => {
    const element = getbyQry(selector);
    return element ? element.innerText : "";
  },
  textContent: (selector) => {
    const element = getbyQry(selector);
    return element ? element.textContent : "";
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
  },
  value: (selector) => {
    const element = getbyQry(selector);
    return element ? element.value : "";
  },
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
    return element ? element.innerHTML : "";
  },
  innerText: (selector, num = 0) => {
    const element = ElbyQryAll.get(selector, num);
    return element ? element.innerText : "";
  },
  textContent: (selector, num = 0) => {
    const element = ElbyQryAll.get(selector, num);
    return element ? element.textContent : "";
  },
  forEach: (selector, callback) => {
    Array.from(getbyQryAll(selector)).forEach(callback);
  },
  value: (selector, num = 0) => {
    const element = ElbyQryAll.get(selector, num);
    return element ? element.value : "";
  },
};

export const Api = {
  put: tryCatchDec(async (url, data) => {
    const response = await fetch(`${url}/${data.idx}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { success: true, data: await response.json() };
  }, 'put'),

  post: tryCatchDec(async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { success: true, data: await response.json() };
  }, 'post'),

  delete: tryCatchDec(async (url, id) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { success: true };
  }, 'delete'),

  getAll: tryCatchDec(async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }, 'getAll'),
};


export const Attr = {
 
  get: (element, attr) => {
    if (!element || !attr) return null;
    return element.getAttribute(attr);
  },

   
  set: (element, attr, value) => {
    if (!element || !attr) return false;
    try {
      element.setAttribute(attr, value);
      return true;
    } catch (error) {
      console.error('Error setting attribute:', error);
      return false;
    }
  },

   
  remove: (element, attr) => {
    if (!element || !attr) return false;
    try {
      element.removeAttribute(attr);
      return true;
    } catch (error) {
      console.error('Error removing attribute:', error);
      return false;
    }
  },

   
  has: (element, attr) => {
    if (!element || !attr) return false;
    return element.hasAttribute(attr);
  },
 
  toggle: (element, attr, value = '') => {
    if (!element || !attr) return false;
    try {
      const hasAttr = element.hasAttribute(attr);
      if (hasAttr) {
        element.removeAttribute(attr);
        return false;
      } else {
        element.setAttribute(attr, value);
        return true;
      }
    } catch (error) {
      console.error('Error toggling attribute:', error);
      return false;
    }
  },

 
  setMultiple: (element, attributes) => {
    if (!element || !attributes || typeof attributes !== 'object') return false;
    try {
      Object.entries(attributes).forEach(([attr, value]) => {
        element.setAttribute(attr, value);
      });
      return true;
    } catch (error) {
      console.error('Error setting multiple attributes:', error);
      return false;
    }
  },

 
  getAll: (element) => {
    if (!element) return null;
    try {
      const attributes = {};
      Array.from(element.attributes).forEach(attr => {
        attributes[attr.name] = attr.value;
      });
      return attributes;
    } catch (error) {
      console.error('Error getting all attributes:', error);
      return null;
    }
  }
};
