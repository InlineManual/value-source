import ElementCollector from 'element-collector';


function getElement(selector) {
  const collector = new ElementCollector(selector);
  return collector.get()[0] || null;
}

/**
 * Returns single matching element or `null` if no matching element is found.
 * @param {*} selector
 * @returns {Element|null}
 */
export function element (selector) {
  return getElement(selector);
}

/**
 * Returns text content of an element and all its children. Returns `null` if no matching element is found.
 * @param {*} selector
 * @returns {string|null}
 */
export function element_content (selector) {
  const found_element = getElement(selector);
  if (found_element !== null) {
    return found_element.textContent;
  }
  return null;
}

/**
 * Returns value of an element (should be form field). Form fields that can hold multiple values (e.g. multi select, checkboxes) return array of values. Returns `null` if no matching element is found.
 * @param {*} selector
 * @returns {Array|string|null}
 */
export function element_value (selector) {
  const found_element = getElement(selector);
  if (found_element) {

    if (found_element.tagName === 'INPUT' && found_element.type === 'text') {
      return found_element.value;
    }

    if (found_element.tagName === 'TEXTAREA') {
      return found_element.value;
    }

    if (found_element.tagName === 'SELECT') {
      const options_list = found_element.options;

      if (found_element.multiple) {
        return Object.keys(options_list)
          .map(key => options_list[key])
          .filter(item => item.selected)
          .map(item => item.value);
      } else {
        const selected_index = found_element.selectedIndex;

        if (options_list.length > 0 && selected_index > -1) {
          return options_list[selected_index].value
        }
      }

    }

  }
  return null;
}


/**
 * Returns `true` if element is checked, otherwise `false`. Works only on CHECKBOX and RADIO inputs. All other matching elements will return `null`.
 * @param {*} selector
 * @returns {boolean|null}
 */
export function element_checked (selector) {
  const found_element = getElement(selector);
  if (
    found_element
    && found_element.tagName === 'INPUT'
    && (found_element.type === 'checkbox' || found_element.type === 'radio')
  ) {
    return found_element.checked;
  }

  return null;
}
