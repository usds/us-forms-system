'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSchemaFormReducer;

var _helpers = require('../state/helpers');

var _reducers = require('../state/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSchemaFormReducer(formConfig) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _helpers.createInitialState)(formConfig);
  var formReducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _reducers2.default;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var reducer = formReducers[action.type];

    if (reducer) {
      return reducer(state, action);
    }

    return state;
  };
}
//# sourceMappingURL=index.js.map