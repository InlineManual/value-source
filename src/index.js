import {
  getNestedProperty,
  deleteNestedProperty
} from 'get-nested-property';
import all_sources from './sources/index.js';
import arrayReduce from 'array-reduce-prototypejs-fix';

/**
 * Object containing getter functions. The keys are names, the values are either functions or other SourcesList objects.
 * @typedef {Object} SourcesList
 */

/**
 * Dot separated path to a property inside SourcesList.
 * @typedef {string} SourcePath
 */

/**
 * Single path or list of paths to sources properties.
 * @typedef {(SourcePath|Array.<SourcePath>)} SourcePathList
 */

/**
 * @typedef {Object} GetValueConfig
 * @property {SourcePathList} source - First non-null value returned by getters will be returned.
 * @property {(*|Array)} parameters - List of parameters to be used when calling source getters. Single item of any other type than Array will be converted to Array.
 * @property {*} [default_value] - Value to be returned when sources do not produce any non-null value.
 */


/**
 * Checks whether `value` is other than `undefined` or `null`.
 * @param {*} value
 * @returns {boolean}
 * @ignore
 */
function exists (value) {
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
function ensureArray (input) {
  return (Array.isArray(input)) ? input : [input];
}


/**
 * Ensures that only Object can be input and the values are either sub-objects or functions.
 * @param {*} input
 * @returns {SourcesList}
 * @ignore
 */
function sanitizeSourcesList (input) {
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
function mergeSourcesList (a = {}, b = {}) {
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


/**
 * Returns value from selected source(s).
 * @param {SourcesList} sources
 * @param {GetValueConfig} config
 * @returns {*}
 */
export function getValueFromSource (
  sources = {},
  {source = [], parameters = [], default_value = null} = {}
) {
  source = ensureArray(source);
  parameters = ensureArray(parameters);

  const check_source = function (prev, current) {
    const source = getNestedProperty(sources, current);
    return (prev === null && typeof source === 'function')
      ? source.apply(null, parameters)
      : prev;
  };

  const found_value = arrayReduce(source, check_source, null);
  return exists(found_value) ? found_value : default_value;
}


/**
 * Constructs object with methods for working with sources and `getValue` method to execute `getValueFromSource` on them.
 * @param {SourcesList} [sources=default_sources]
 * @returns {{getSources: getSources, setSources: setSources, addSources: addSources, removeSources: removeSources, getValue: getValue}}
 */
export function constructSourceGetter (sources = default_sources) {

  let _sources;
  setSources(sources);

  /**
   * Returns currently set sources list.
   * @returns {SourcesList}
   */
  function getSources () {
    return _sources;
  }

  /**
   * Replaces existing sources with new ones.
   * @param {SourcesList} sources
   * @returns {SourcesList}
   */
  function setSources (sources) {
    _sources = sanitizeSourcesList(sources);
    return _sources;
  }

  /**
   * Adds sources to existing ones.
   * @param {SourcesList} sources
   * @returns {SourcesList}
   */
  function addSources (sources) {
    const sanitized_sources = sanitizeSourcesList(sources);
    _sources = mergeSourcesList(_sources, sanitized_sources);
    return _sources;
  }

  /**
   * Removes specific sources by paths.
   * @param {SourcePathList} sources
   * @returns {SourcesList}
   */
  function removeSources (sources = []) {
    sources = ensureArray(sources);
    sources.forEach((source) => deleteNestedProperty(_sources, source));
    return _sources;
  }

  /**
   * Applies `getValueFromSource` on currently set sources.
   * @param {GetValueConfig} config
   * @returns {*}
   */
  function getValue (config) {
    return getValueFromSource(_sources, config);
  }

  return {
    getSources: getSources,
    setSources: setSources,
    addSources: addSources,
    removeSources: removeSources,
    getValue: getValue
  }
}


/**
 * Source of predefined source getters.
 * @name default_sources
 * @type {{global: default_sources.global, environment: {current_url: default_sources.environment.current_url, frame_name: default_sources.environment.frame_name, frame_depth: default_sources.environment.frame_depth, frame_element: default_sources.environment.frame_element}, document: {element: default_sources.document.element}}}
 */
export const default_sources = all_sources;
