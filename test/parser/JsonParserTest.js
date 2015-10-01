'use strict';

var common = require('../common');

var should = common.should;
var assert = common.assert;

describe('JsonParser', function () {
  var parse = require('../../lib/parser/JsonParser');

  it('should parse valid json without error', function (done) {
    var validJson = '{"abc":"123","def":[3,1,2]}';
    parse(validJson, function (err, result) {
      assert.isNull(err);

      assert.isTrue(!!result);
      assert.isString(result.abc);
      assert.equal(result.abc, "123");
      assert.isArray(result.def);
      assert.sameMembers(result.def, [3, 1, 2]);

      done();
    });
  });

  it('should parse invalid json with error', function (done) {
    var invalidJson = ',{"abc":"123","def":[3,1,2]}';
    parse(invalidJson, function (err, result) {
      assert.isUndefined(result);

      assert.isTrue(!!err);
      assert.isString(err.message);
      assert.equal(err.message, "Unexpected token ,");

      done();
    });
  });
});