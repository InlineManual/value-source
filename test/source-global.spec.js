import x from './../src/sources/global.js';


describe('global', function () {

  afterEach(function () {
    delete window.aaa;
  });

  it('should return global object if no parameter is provided', function () {
    expect(x()).toEqual(window);
  });

  it('should return value', function () {
    window.aaa = 'bbb';
    expect(x('aaa')).toEqual('bbb');
  });

  it('should return nested value', function () {
    window.aaa = {bbb: 'ccc'};
    expect(x('aaa.bbb')).toEqual('ccc');
  });

  it('should return returned value if value is function', function () {
    window.aaa = function () {return 'bbb'};
    expect(x('aaa')).toEqual('bbb');
  });

  it('should use parameters if value is function', function () {
    window.aaa = jasmine.createSpy('global_function');
    x('aaa', ['bbb', 'ccc']);
    expect(window.aaa).toHaveBeenCalledWith('bbb', 'ccc');
  });

});
