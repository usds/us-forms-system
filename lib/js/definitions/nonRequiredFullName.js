'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

exports.default = nonRequiredFullName;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nonRequiredFullName(fullName) {
  return (0, _assign3.default)({}, fullName, {
    required: []
  });
}