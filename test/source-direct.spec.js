import x from './../src/sources/direct.js';


describe('direct', function () {

  it('should return provided parameter unchanged', function () {
    expect(x('aaa')).toEqual('aaa');
  });

});

