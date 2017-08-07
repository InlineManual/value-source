import * as x from './../src/sources/document.js';


describe('document', function () {

  function createElement (parent = document.body, class_name = '') {
    const elm = document.createElement('div');
    parent.appendChild(elm);
    elm.className = ['test', class_name].join(' ');
    return elm;
  }

  function createElementTag (tag = 'div', attributes = {}, parent = document.body) {
    const elm = document.createElement(tag);

    Object.keys(attributes).forEach(key => {
      elm.setAttribute(key, attributes[key]);
    });

    elm.classList.add('test');

    parent.appendChild(elm);

    return elm;
  }

  afterEach(function () {
    const test_elements = document.querySelectorAll('.test');
    Array.prototype.slice.apply(test_elements).forEach((elm) => {
      elm.parentNode.removeChild(elm);
    });
  });

  describe('element', function () {

    it('should return null if selector is missing', function () {
      expect(x.element()).toEqual(null);
    });

    it('should return null if no element is found', function () {
      expect(x.element('xxx')).toEqual(null);
    });

    it('should return element', function () {
      const elm = createElement();
      expect(x.element('.test')).toEqual(elm);
    });

    it('should return nested element', function () {
      const parent_element = createElement();
      const child_element = createElement(parent_element, 'child');
      expect(x.element('.child'))
        .toEqual(child_element);
    });

  });

  describe('element content', function () {

    it('should return `null` when no matching element is found', function () {
      const result = x.element_content();
      expect(result).toEqual(null);
    });

    it('should return empty string on empty element', function () {
      const elm = createElement();
      const result = x.element_content(elm);
      expect(result).toEqual('');
    });

    it('should return element text content', function () {
      const elm = createElement();
      elm.innerHTML = 'aaa';
      const result = x.element_content(elm);
      expect(result).toEqual('aaa');
    });

    it('should return element text content including children', function () {
      const elm = createElement();
      elm.innerHTML = 'aaa <span>bbb</span>';
      const result = x.element_content(elm);
      expect(result).toEqual('aaa bbb');
    });

  });

  describe('element value', function () {

    it('should return `null` if no matching element is found', function () {
      const result = x.element_value();
      expect(result).toEqual(null);
    });

    it('should return `null` if element type is not recognized', function () {
      const elm = createElement();
      const result = x.element_value(elm);
      expect(result).toEqual(null);
    });

    it('should return value of INPUT field', function () {
      const elm = createElementTag('input', {value: 'aaa'});
      const result = x.element_value(elm);
      expect(result).toEqual('aaa');
    });

    it('should return value of TEXTAREA', function () {
      const elm = createElementTag('textarea');
      elm.innerHTML = 'aaa';
      const result = x.element_value(elm);
      expect(result).toEqual('aaa');
    });

    it('should return `null` if nothing is selected in SELECT', function () {
      const elm = createElementTag('SELECT');
      const result = x.element_value(elm);
      expect(result).toEqual(null);
    });

    it('should return selected value of SELECT', function () {
      const elm = createElementTag('SELECT');
      elm.innerHTML = '' +
        '<option value="aaa" selected></option>' +
        '<option value="bbb"></option>';
      const result = x.element_value(elm);
      expect(result).toEqual('aaa');
    });

    it('should return array of selected values of multi SELECT', function () {
      const elm = createElementTag('SELECT', {multiple: true});
      elm.innerHTML = '' +
        '<option value="aaa" selected></option>' +
        '<option value="bbb"></option>' +
        '<option value="ccc" selected></option>';
      const result = x.element_value(elm);
      expect(result).toEqual(['aaa', 'ccc']);
    });

  });

  describe('element checked', function () {

    it('should return `null` if no matching element is found', function () {
      const result = x.element_checked();
      expect(result).toEqual(null);
    });

    it('should return `null` if element type is not recognized', function () {
      const elm = createElementTag('div');
      const result = x.element_checked(elm);
      expect(result).toEqual(null);
    });

    it('should return `true` if CHECKBOX is checked', function () {
      const elm = createElementTag('input', {type: 'checkbox', checked: true});
      const result = x.element_checked(elm);
      expect(result).toEqual(true);
    });

    it('should return `false` if CHECKBOX is not checked', function () {
      const elm = createElementTag('input', {type: 'checkbox'});
      const result = x.element_checked(elm);
      expect(result).toEqual(false);
    });

    it('should return `true` if RADIO is checked', function () {
      const elm = createElementTag('input', {type: 'radio', checked: true});
      const result = x.element_checked(elm);
      expect(result).toEqual(true);
    });

    it('should return `false` if RADIO is not checked', function () {
      const elm = createElementTag('input', {type: 'radio'});
      const result = x.element_checked(elm);
      expect(result).toEqual(false);
    });

  });

});
