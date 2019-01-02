'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyWidget = function (_React$Component) {
  _inherits(CurrencyWidget, _React$Component);

  function CurrencyWidget(props) {
    _classCallCheck(this, CurrencyWidget);

    var _this = _possibleConstructorReturn(this, (CurrencyWidget.__proto__ || Object.getPrototypeOf(CurrencyWidget)).call(this, props));

    _this.onBlur = function () {
      _this.props.onBlur(_this.props.id);
    };

    _this.handleChange = function (event) {
      var val = event.target.value;
      if (val === '' || typeof val === 'undefined') {
        _this.props.onChange();
      } else {
        // Needs to look like a currency
        if (!/^\${0,1}[0-9,]*(\.\d{1,2})?$/.test(val)) {
          _this.props.onChange(val);
        } else {
          // Needs to parse as a number
          var parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
          if (!isNaN(parsed)) {
            _this.props.onChange(parsed);
          } else {
            _this.props.onChange(val);
          }
        }
      }
      _this.setState({ value: val });
    };

    var value = props.value;
    if (typeof value === 'number') {
      value = value.toFixed(2);
    }
    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(CurrencyWidget, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          disabled = _props.disabled,
          options = _props.options;

      var value = this.state.value;

      return _react2.default.createElement('input', {
        autoComplete: options.autocomplete,
        type: 'text',
        id: id,
        name: id,
        disabled: disabled,
        className: (0, _classnames2.default)(this.props.options.widgetClassNames),
        value: typeof value === 'undefined' ? '' : value,
        onBlur: this.onBlur,
        onChange: this.handleChange });
    }
  }]);

  return CurrencyWidget;
}(_react2.default.Component);

exports.default = CurrencyWidget;


CurrencyWidget.propTypes = {
  /**
   * ui:options from uiSchema
   */
  options: _propTypes2.default.shape({
    /*
    * input's autocomplete attribute value
    */
    autocomplete: _propTypes2.default.string
  })
};

CurrencyWidget.defaultProps = {
  options: {}
};
//# sourceMappingURL=CurrencyWidget.js.map