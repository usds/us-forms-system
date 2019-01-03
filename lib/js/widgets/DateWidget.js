'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date = require('../utilities/date');

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getEmptyState(value) {
  return {
    value: (0, _helpers.parseISODate)(value),
    touched: {
      month: false,
      day: false,
      year: false
    }
  };
}

var DateWidget = function (_React$Component) {
  _inherits(DateWidget, _React$Component);

  function DateWidget(props) {
    _classCallCheck(this, DateWidget);

    var _this = _possibleConstructorReturn(this, (DateWidget.__proto__ || Object.getPrototypeOf(DateWidget)).call(this, props));

    _this.isTouched = function (_ref) {
      var year = _ref.year,
          month = _ref.month,
          day = _ref.day;

      if ((0, _get3.default)('options.monthYear', _this.props)) {
        return year && month;
      }

      return year && day && month;
    };

    _this.isIncomplete = function (_ref2) {
      var month = _ref2.month,
          year = _ref2.year,
          day = _ref2.day;

      if ((0, _get3.default)('options.monthYear', _this.props)) {
        return !year || !month;
      }

      return !year || !month || !day;
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.state = getEmptyState(_this.props.value);
    return _this;
  }

  _createClass(DateWidget, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.formContext.pagePerItemIndex !== this.props.formContext.pagePerItemIndex) {
        this.setState(getEmptyState(newProps.value));
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(field) {
      var _this2 = this;

      var newState = (0, _set3.default)(['touched', field], true, this.state);
      this.setState(newState, function () {
        if (_this2.isTouched(newState.touched)) {
          _this2.props.onBlur(_this2.props.id);
        }
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(field, value) {
      var _this3 = this;

      var newState = (0, _set3.default)(['value', field], value, this.state);
      newState = (0, _set3.default)(['touched', field], true, newState);

      this.setState(newState, function () {
        if (_this3.props.required && _this3.isIncomplete(newState.value)) {
          _this3.props.onChange();
        } else {
          _this3.props.onChange((0, _helpers.formatISOPartialDate)(newState.value));
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          id = _props.id,
          _props$options = _props.options,
          options = _props$options === undefined ? {} : _props$options;
      var _state$value = this.state.value,
          month = _state$value.month,
          day = _state$value.day,
          year = _state$value.year;

      var daysForSelectedMonth = void 0;

      var monthYear = options.monthYear;
      if (month) {
        daysForSelectedMonth = _date.days[month];
      }
      return _react2.default.createElement(
        'div',
        { className: 'usa-date-of-birth row' },
        _react2.default.createElement(
          'div',
          { className: 'form-datefield-month' },
          _react2.default.createElement(
            'label',
            { className: 'input-date-label', htmlFor: id + 'Month' },
            'Month'
          ),
          _react2.default.createElement(
            'select',
            {
              name: id + 'Month',
              id: id + 'Month',
              value: month,
              onChange: function onChange(event) {
                return _this4.handleChange('month', event.target.value);
              } },
            _react2.default.createElement('option', { value: '' }),
            _date.months.map(function (mnth) {
              return _react2.default.createElement(
                'option',
                { key: mnth.value, value: mnth.value },
                mnth.label
              );
            })
          )
        ),
        !monthYear && _react2.default.createElement(
          'div',
          { className: 'form-datefield-day' },
          _react2.default.createElement(
            'label',
            { className: 'input-date-label', htmlFor: id + 'Day' },
            'Day'
          ),
          _react2.default.createElement(
            'select',
            {
              name: id + 'Day',
              id: id + 'Day',
              value: day,
              onChange: function onChange(event) {
                return _this4.handleChange('day', event.target.value);
              } },
            _react2.default.createElement('option', { value: '' }),
            daysForSelectedMonth && daysForSelectedMonth.map(function (dayOpt) {
              return _react2.default.createElement(
                'option',
                { key: dayOpt, value: dayOpt },
                dayOpt
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'usa-datefield usa-form-group usa-form-group-year' },
          _react2.default.createElement(
            'label',
            { className: 'input-date-label', htmlFor: id + 'Year' },
            'Year'
          ),
          _react2.default.createElement('input', { type: 'number',
            autoComplete: options.autocomplete,
            name: id + 'Year',
            id: id + 'Year',
            max: '3000',
            min: '1900',
            pattern: '[0-9]{4}',
            value: year,
            onBlur: function onBlur() {
              return _this4.handleBlur('year');
            },
            onChange: function onChange(event) {
              return _this4.handleChange('year', event.target.value);
            } })
        )
      );
    }
  }]);

  return DateWidget;
}(_react2.default.Component);

exports.default = DateWidget;


DateWidget.propTypes = {
  id: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func.isRequired,
  /**
   * ui:options from uiSchema
  */
  options: _propTypes2.default.shape({
    /*
    * input's autocomplete attribute value
    */
    autocomplete: _propTypes2.default.string
  }),
  value: _propTypes2.default.string
};

DateWidget.defaultProps = {
  options: {}
};
//# sourceMappingURL=DateWidget.js.map