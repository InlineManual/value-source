/**
 * Returns full URL of current document.
 * @returns {string}
 */
export function current_url () {
  return document.location.toString();
}

/**
 * Returns frame name.
  * @returns {string}
 */
export function frame_name () {
  return window.name || '';
}

/**
 * Returns ID of parent frame element, or `null` if ID is not set or there's no parent frame.
 * @returns {null|string}
 */
export function frame_id () {
  return (window.frameElement === null)
    ? null
    : window.frameElement.getAttribute('id');
}

/**
 * Returns number of parent frames above current document.
 * @returns {number}
 */
export function frame_depth () {
  let result = 0;

  let current_window = window;
  while (current_window !== window.top) {
    result++;
    current_window = current_window.parent;
  }

  return result;
}

/**
 * Returns reference to a FRAME or IFRAME element.
 * @returns {Object}
 */
export function frame_element () {
  return window.frameElement;
}


/**
 * Returns value of frame element's attribute. Returns `null` if it is not possible.
 * @param {string} attribute_name
 * @returns {string|null}
 */
export function frame_attribute (attribute_name) {
  if (typeof attribute_name !== 'string') {
    return null;
  }

  if (!window.frameElement) {
    return null;
  }

  return window.frameElement.getAttribute(attribute_name);
}

/**
 * Returns `true` if current window (or any of its frames) currently has focus.
 * @returns {boolean}
 */
export function window_focus () {
    const hasFocus = (doc) => {
      if (doc.hasFocus()) {
        return true;
      }

      const frames = document.querySelectorAll('iframe, frame');
      for (let i = 0; i < frames.length; i++) {
        if (hasFocus(frames[i])) {
          return true;
        }
      }

      return false;
    };

    return hasFocus(document);
}
