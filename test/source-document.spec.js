import * as x from './../src/sources/document.js';


describe('document', function () {

  describe('element', function () {

    function createElement (parent = document.body, class_name = '') {
      const elm = document.createElement('div');
      parent.appendChild(elm);
      elm.className = ['test', class_name].join(' ');
      return elm;
    }

    afterEach(function () {
      const test_elements = document.querySelectorAll('.test');
      Array.prototype.slice.apply(test_elements).forEach((elm) => {
        elm.parentNode.removeChild(elm);
      });
    });

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

});
