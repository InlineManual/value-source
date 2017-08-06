import ElementCollector from 'element-collector';


/**
 * Returns single matching element or `null` if no matching element is found.
 * @param {string} selector
 * @returns {Element|null}
 */
export function element (selector) {
  const collector = new ElementCollector(selector);
  return collector.get()[0] || null;
}
