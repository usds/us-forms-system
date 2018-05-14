import _set from 'lodash/fp/set';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Downshift from 'downshift';
import { sortListByFuzzyMatch } from '../helpers';
import classNames from 'classnames';

var ESCAPE_KEY = 27;

function getInput(input, uiSchema, schema) {
  if (input && input.widget === 'autosuggest') {
    return input.label;
  }

  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' && input) {
    var uiOptions = uiSchema['ui:options'];
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
      var _this2 = this;

      if (!this.props.formContext.reviewMode) {
        var getOptions = this.props.uiSchema['ui:options'].getOptions;
        if (getOptions) {
          getOptions().then(function (options) {
            if (!_this2.unmounted) {
              _this2.setState({ options: options, suggestions: _this2.getSuggestions(options, _this2.state.input) });
            }
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          idSchema = _props.idSchema,
          formContext = _props.formContext,
          formData = _props.formData,
          uiSchema = _props.uiSchema,
          schema = _props.schema;

      var id = idSchema.$id;

      if (formContext.reviewMode) {
        return React.createElement(
          'div',
          { className: 'review-row' },
          React.createElement(
            'dt',
            null,
            this.props.uiSchema['ui:title']
          ),
          React.createElement(
            'dd',
            null,
            React.createElement(
              'span',
              null,
              getInput(formData, uiSchema, schema)
            )
          )
        );
      }

      return React.createElement(Downshift, {
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
          return React.createElement(
            'div',
            { className: 'autosuggest-container' },
            React.createElement('input', getInputProps({
              id: id,
              name: id,
              onBlur: isOpen ? undefined : _this3.handleBlur,
              onKeyDown: _this3.handleKeyDown
            })),
            isOpen && React.createElement(
              'div',
              { className: 'autosuggest-list', role: 'listbox' },
              _this3.state.suggestions.map(function (item, index) {
                return React.createElement(
                  'div',
                  _extends({}, getItemProps({ item: item }), {
                    role: 'option',
                    'aria-selected': selectedItem === item.label ? 'true' : 'false',
                    className: classNames('autosuggest-item', {
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
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.getSuggestions = function (options, value) {
    if (value) {
      var uiOptions = _this4.props.uiSchema['ui:options'];
      return sortListByFuzzyMatch(value, options).slice(0, uiOptions.maxOptions);
    }

    return options;
  };

  this.getFormData = function (suggestion) {
    if (_this4.useEnum) {
      return suggestion.id;
    }

    return _set('widget', 'autosuggest', suggestion);
  };

  this.handleInputValueChange = function (inputValue) {
    if (inputValue !== _this4.state.input) {
      var item = { widget: 'autosuggest', label: inputValue };
      // once the input is long enough, check for exactly matching strings so that we don't
      // force a user to click on an item when they've typed an exact match of a label
      if (inputValue && inputValue.length > 3) {
        var matchingItem = _this4.state.suggestions.find(function (suggestion) {
          return suggestion.label === inputValue;
        });
        if (matchingItem) {
          item = _this4.getFormData(matchingItem);
        }
      }

      _this4.props.onChange(item);

      _this4.setState({
        input: inputValue,
        suggestions: _this4.getSuggestions(_this4.state.options, inputValue)
      });
    } else if (inputValue === '') {
      _this4.props.onChange();
      _this4.setState({
        input: inputValue,
        suggestions: _this4.getSuggestions(_this4.state.options, inputValue)
      });
    }
  };

  this.handleChange = function (selectedItem) {
    var value = _this4.getFormData(selectedItem);
    _this4.props.onChange(value);
    if (_this4.state.input !== selectedItem.label) {
      _this4.setState({
        input: selectedItem.label
      });
    }
  };

  this.handleKeyDown = function (event) {
    if (event.keyCode === ESCAPE_KEY) {
      _this4.setState({ input: '' });
    }
  };

  this.handleBlur = function () {
    _this4.props.onBlur(_this4.props.idSchema.$id);
  };
};

export default AutosuggestField;