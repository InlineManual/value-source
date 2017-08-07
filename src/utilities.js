/**
 * Checks whether `value` is other than `undefined` or `null`.
 * @param {*} value
 * @returns {boolean}
 * @ignore
 */
export function exists (value) {
  return typeof value !== 'undefined' && value !== null;
}


/**
 * Checks whether input is Object.
 * @param {*} input
 * @returns {boolean}
 * @ignore
 */
function isObject (input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}


/**
 * Converts input to array, unless it already is array.
 * @param {*} input
 * @returns {Array}
 * @ignore
 */
export function ensureArray (input) {
  return (Array.isArray(input)) ? input : [input];
}


/**
 * Ensures that only Object can be input and the values are either sub-objects or functions.
 * @param {*} input
 * @returns {SourcesList}
 * @ignore
 */
export function sanitizeSourcesList (input) {
  const result = {};

  if (isObject(input)) {
    Object.keys(input).forEach(function (key) {
      const val = input[key];
      if (typeof val === 'function') {
        result[key] = val;
      }
      if (isObject(val)) {
        result[key] = sanitizeSourcesList(val);
      }
    });
  }

  return result;
}


/**
 * Recursively adds function properties form `b` to `a`.
 * @param {SourcesList} a
 * @param {SourcesList} b
 * @returns {SourcesList}
 * @ignore
 */
export function mergeSourcesList (a = {}, b = {}) {
  Object.keys(b).forEach(function (key) {
    const val = b[key];
    if (typeof val === 'function') {
      a[key] = val;
    }
    if (isObject(val)) {
      a[key] = mergeSourcesList(a[key], val);
    }
  });
  return a;
}


