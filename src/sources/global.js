import {getNestedProperty} from 'get-nested-property';


/**
 * Finds value in global namespace.
 * @param {string} path - Dot separated path to value in global namespace.
 * @param {Array} parameters
 * @returns {*}
 */
export default function (path = '', parameters = []) {
  const root = window;
  const result = getNestedProperty(root, path);
  return typeof result === 'function'
    ? result.apply(null, parameters)
    : result;
}
