'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _downshift = require('downshift');

var _downshift2 = _interopRequireDefault(_downshift);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _debounce = require('../utilities/data/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _fuzzyMatching = require('../utilities/fuzzy-matching');

var _fuzzyMatching2 = _interopRequireDefault(_fuzzyMatching);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ESCAPE_KEY = 27;

function getInput(input, uiSchema, schema) {
  if (input && input.widget === 'autosuggest') {
    return input.label;
  }

  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && input) {
    var uiOptions = uiSchema['ui:options'];
    // When using this field in an array item, editing the item will throw an error
    //  if there uiOptions.label is undefined (as when we queryForResults), so we
    //  have to have this safety valve
    if (!uiOptions.labels) {
      return input;
    }

    if (uiOptions.labels[input]) {
      return uiOptions.labels[input];
    }

    var index = schema.enum.indexOf(input) >= 0;
    if (schema.enumNames && index >= 0) {
      return uiOptions.labels[input] || schema.enumNames[index];
    }
  }

  return '';
}

var AutosuggestField = function (_React$Component) {
  _inherits(AutosuggestField, _React$Component);

  function AutosuggestField(props) {
    _classCallCheck(this, AutosuggestField);

    var _this = _possibleConstructorReturn(this, (AutosuggestField.__proto__ || Object.getPrototypeOf(AutosuggestField)).call(this, props));

    _initialiseProps.call(_this);

    var uiSchema = props.uiSchema,
        schema = props.schema,
        formData = props.formData;

    var input = getInput(formData, uiSchema, schema);
    var uiOptions = uiSchema['ui:options'];

    var options = [];
    var suggestions = [];

    if (!uiOptions.getOptions) {
      _this.useEnum = true;
      options = schema.enum.map(function (id, index) {
        return {
          id: id,
          label: uiOptions.labels[id] || schema.enumNames[index]
        };
      });
      suggestions = _this.getSuggestions(options, input);
    }

    var debounceRate = uiOptions.debounceRate === undefined ? 1000 : uiOptions.debounceRate;
    _this.debouncedGetOptions = (0, _debounce2.default)(debounceRate, _this.getOptions);

    _this.state = {
      options: options,
      input: input,
      suggestions: suggestions
    };
    return _this;
  }

  _createClass(AutosuggestField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.formContext.reviewMode) {
        this.getOptions();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
      this.debouncedGetOptions.cancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          idSchema = _props.idSchema,
          formContext = _props.formContext,
          formData = _props.formData,
          uiSchema = _props.uiSchema,
          schema = _props.schema;

      var id = idSchema.$id;

      if (formContext.reviewMode) {
        var readOnlyData = _react2.default.createElement(
          'span',
          null,
          getInput(formData, uiSchema, schema)
        );

        // If this is an non-object field then the label will
        // be included by ReviewFieldTemplate
        if (schema.type !== 'object') {
          return readOnlyData;
        }

        return _react2.default.createElement(
          'div',
          { className: 'review-row' },
          _react2.default.createElement(
            'dt',
            null,
            this.props.uiSchema['ui:title']
          ),
          _react2.default.createElement(
            'dd',
            null,
            readOnlyData
          )
        );
      }

      return _react2.default.createElement(_downshift2.default, {
        onChange: this.handleChange,
        onInputValueChange: this.handleInputValueChange,
        inputValue: this.state.input,
        selectedItem: this.state.input,
        onOuterClick: this.handleBlur,
        itemToString: function itemToString(item) {
          if (typeof item === 'string') {
            return item;
          }

          return item.label;
        },
        render: function render(_ref) {
          var getInputProps = _ref.getInputProps,
              getItemProps = _ref.getItemProps,
              isOpen = _ref.isOpen,
              selectedItem = _ref.selectedItem,
              highlightedIndex = _ref.highlightedIndex;
          return _react2.default.createElement(
            'div',
            { className: 'autosuggest-container' },
            _react2.default.createElement('input', getInputProps({
              autoComplete: 'off',
              id: id,
              name: id,
              className: 'autosuggest-input',
              onBlur: isOpen ? undefined : _this2.handleBlur,
              onKeyDown: _this2.handleKeyDown
            })),
            isOpen && _react2.default.createElement(
              'div',
              { className: 'autosuggest-list', role: 'listbox' },
              _this2.state.suggestions.map(function (item, index) {
                return _react2.default.createElement(
                  'div',
                  _extends({}, getItemProps({ item: item }), {
                    role: 'option',
                    'aria-selected': selectedItem === item.label ? 'true' : 'false',
                    className: (0, _classnames2.default)('autosuggest-item', {
                      'autosuggest-item-highlighted': highlightedIndex === index,
                      'autosuggest-item-selected': selectedItem === item.label
                    }),
                    key: item.id }),
                  item.label
                );
              })
            )
          );
        } });
    }
  }]);

  return AutosuggestField;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getOptions = function (inputValue) {
    var getOptions = _this3.props.uiSchema['ui:options'].getOptions;
    if (getOptions) {
      getOptions(inputValue).then(_this3.setOptions);
    }
  };

  this.setOptions = function (options) {
    if (!_this3.unmounted) {
      _this3.setState({ options: options, suggestions: _this3.getSuggestions(options, _this3.state.input) });
    }
  };

  this.getSuggestions = function (options, value) {
    if (value) {
      var uiOptions = _this3.props.uiSchema['ui:options'];
      return (0, _fuzzyMatching2.default)(value, options).slice(0, uiOptions.maxOptions);
    }

    return options;
  };

  this.getFormData = function (suggestion) {
    if (_this3.useEnum) {
      return suggestion.id;
    }

    // When freeInput is true, we'll return the label to the api instead of the id
    if (_this3.props.uiSchema['ui:options'].freeInput) {
      return suggestion.label;
    }

    return (0, _set3.default)('widget', 'autosuggest', suggestion);
  };

  this.handleInputValueChange = function (inputValue) {
    if (inputValue !== _this3.state.input) {
      var uiOptions = _this3.props.uiSchema['ui:options'];
      if (uiOptions.queryForResults) {
        _this3.debouncedGetOptions(inputValue);
      }

      var item = { widget: 'autosuggest', label: inputValue };
      // once the input is long enough, check for exactly matching strings so that we don't
      // force a user to click on an item when they've typed an exact match of a label
      if (inputValue && inputValue.length > 3) {
        var matchingItem = _this3.state.suggestions.find(function (suggestion) {
          return suggestion.label === inputValue;
        });
        if (matchingItem) {
          item = _this3.getFormData(matchingItem);
        }
      }

      _this3.props.onChange(_this3.props.uiSchema['ui:options'].freeInput || _this3.useEnum ? inputValue : item);
      _this3.setState({
        input: inputValue,
        suggestions: _this3.getSuggestions(_this3.state.options, inputValue)
      });
    } else if (inputValue === '') {
      _this3.props.onChange();
      _this3.setState({
        input: inputValue,
        suggestions: _this3.getSuggestions(_this3.state.options, inputValue)
      });
    }
  };

  this.handleChange = function (selectedItem) {
    var value = _this3.getFormData(selectedItem);
    _this3.props.onChange(value);
    if (_this3.state.input !== selectedItem.label) {
      _this3.setState({
        input: selectedItem.label
      });
    }
  };

  this.handleKeyDown = function (event) {
    if (event.keyCode === ESCAPE_KEY) {
      _this3.setState({ input: '' });
    }
  };

  this.handleBlur = function () {
    _this3.props.onBlur(_this3.props.idSchema.$id);
  };
};

exports.default = AutosuggestField;
//# sourceMappingURL=AutosuggestField.js.map