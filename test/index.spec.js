import {
  getValueFromSource,
  constructSourceGetter,
  default_sources
} from './../src/';


describe('Value Source', function () {

  describe('getValueFromSource', function () {

    it('should get value from source', function () {
      const sources_list = {
        custom: function () {return 'aaa';}
      };
      const result = getValueFromSource(sources_list, {source: 'custom'});
      expect(result).toEqual('aaa');
    });

    it('should get first non-null value from list of sources', function () {
      const sources_list = {
        custom1: function () {return null;},
        custom2: function () {return 'aaa';}
      };
      const result = getValueFromSource(sources_list, {
        source: ['custom1', 'custom2']
      });
      expect(result).toEqual('aaa');
    });

    it('should get default value if source is invalid', function () {
      const result = getValueFromSource({}, {
        source: 'xxx',
        default_value: 'aaa'
      });
      expect(result).toEqual('aaa');
    });

    it('should use `null` if default value is not set', function () {
      const result = getValueFromSource({}, {source: 'xxx'});
      expect(result).toEqual(null);
    });

    it('should send params to source getter', function () {
      const sources_list = {
        custom: jasmine.createSpy('custom_source')
      };
      getValueFromSource(sources_list, {
        source: 'custom',
        parameters: ['aaa', 'bbb']
      });
      expect(sources_list.custom).toHaveBeenCalledWith('aaa', 'bbb');
    });

    it('should convert single param to array', function () {
      const sources_list = {
        custom: jasmine.createSpy('custom_source')
      };
      getValueFromSource(sources_list, {
        source: 'custom',
        parameters: 'aaa'
      });
      expect(sources_list.custom).toHaveBeenCalledWith('aaa');
    });

  });

  describe('constructSourceGetter', function () {

    it('should construct getter with default sources', function () {
      const source_getter = constructSourceGetter();
      const sources = source_getter.getSources();
      expect(sources).toEqual(default_sources);
    });

    it('should construct getter with custom sources', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter({aaa: fn});
      const sources = source_getter.getSources();
      expect(sources.aaa).toEqual(fn);
    });

    it('should ignore invalid sources', function () {
      const source_getter = constructSourceGetter('xxx');
      const sources = source_getter.getSources();
      expect(sources).toEqual({});
    });

    it('should set sources', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter();
      source_getter.setSources({aaa: fn});
      const sources = source_getter.getSources();
      expect(sources.aaa).toEqual(fn);
    });

    it('should remove existing sources when setting', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter({aaa: fn});
      source_getter.setSources({bbb: fn});
      const sources = source_getter.getSources();
      expect(sources.aaa).not.toBeDefined();
      expect(sources.bbb).toBeDefined();
    });

    it('should add sources', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter();
      source_getter.addSources({aaa: fn});
      const sources = source_getter.getSources();
      expect(sources.aaa).toEqual(fn);
    });

    it('should keep existing sources when adding', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter({aaa: fn});
      source_getter.addSources({bbb: fn});
      const sources = source_getter.getSources();
      expect(sources.aaa).toBeDefined();
      expect(sources.bbb).toBeDefined();
    });

    it('should add deep nested source', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter();
      source_getter.addSources({aaa: {bbb: fn}});
      const sources = source_getter.getSources();
      expect(sources.aaa.bbb).toEqual(fn);
    });

    it('should overwrite existing sources when adding', function () {
      const fn1 = function () {};
      const fn2 = function () {};
      const source_getter = constructSourceGetter({aaa: fn1});
      source_getter.addSources({aaa: fn2});
      const sources = source_getter.getSources();
      expect(sources.aaa).toEqual(fn2);
    });

    it('should remove single source', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter({aaa: fn, bbb: fn});
      source_getter.removeSources('aaa');
      const sources = source_getter.getSources();
      expect(sources.aaa).not.toBeDefined();
      expect(sources.bbb).toBeDefined();
    });

    it('should remove list of sources', function () {
      const fn = function () {};
      const source_getter = constructSourceGetter({aaa: fn, bbb: fn, ccc: fn});
      source_getter.removeSources(['aaa', 'bbb']);
      const sources = source_getter.getSources();
      expect(sources.aaa).not.toBeDefined();
      expect(sources.bbb).not.toBeDefined();
      expect(sources.ccc).toBeDefined();
    });

    it('should not allow to add invalid source', function () {
      const source_getter = constructSourceGetter({aaa: 'xxx'});
      const sources = source_getter.getSources();
      expect(sources.aaa).not.toBeDefined();
    });

    it('should have method to get value', function () {
      const fn = jasmine.createSpy('mock_getter').and.returnValue('bbb');
      const source_getter = constructSourceGetter({aaa: fn});
      const result = source_getter.getValue({
        source: 'aaa',
        parameters: ['param1', 'param2']
      });
      expect(result).toEqual('bbb');
      expect(fn).toHaveBeenCalledWith('param1', 'param2');
    });

    describe('nested getters', function () {

      it('should be allowed', function () {
        const fn = function () {};
        const source_getter = constructSourceGetter({aaa: {bbb: fn}});
        const sources = source_getter.getSources();
        expect(sources.aaa.bbb).toEqual(fn);
      });

      it('should only allow to call function properties', function () {
        const fn = function () {return 'result'};
        const source_getter = constructSourceGetter({aaa: {bbb: fn}});
        expect(source_getter.getValue({source: 'aaa'})).toEqual(null);
        expect(source_getter.getValue({source: 'aaa.bbb'})).toEqual('result');
      });

      it('should allow to add nested properties', function () {
        const fn = function () {};
        const source_getter = constructSourceGetter({aaa: {bbb: fn}});
        source_getter.addSources({aaa: {ccc: fn}});
        const sources = source_getter.getSources();
        expect(sources.aaa.bbb).toEqual(fn);
        expect(sources.aaa.ccc).toEqual(fn);
      });

      it('should allow to remove nested properties', function () {
        const fn = function () {};
        const source_getter = constructSourceGetter({aaa: {bbb: fn, ccc: fn}});
        source_getter.removeSources('aaa.bbb');
        const sources = source_getter.getSources();
        expect(sources.aaa.bbb).not.toBeDefined();
        expect(sources.aaa.ccc).toEqual(fn);
      });

    });

  });

});
