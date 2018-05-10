import _isUndefined from 'lodash/isUndefined';
import _uniqueId from 'lodash/uniqueId';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';

/**
 * A form checkbox with a label that can display error messages.
 *
 * Validation has the following props.
 * `checked` - Boolean. Whether or not the checkbox is checked.
 * `errorMessage` - Error string to display in the component.
 *                  When defined, indicates checkbox has a validation error.
 * `label` - String for the checkbox label.
 * `name` - String for name attribute.
 * `tabIndex` - Number for keyboard tab order.
 * `onValueChange` - a function with this prototype: (newValue)
 * `required` - boolean. Render marker indicating field is required.
 */
var ErrorableCheckbox = function (_React$Component) {
  _inherits(ErrorableCheckbox, _React$Component);

  function ErrorableCheckbox() {
    _classCallCheck(this, ErrorableCheckbox);

    var _this = _possibleConstructorReturn(this, (ErrorableCheckbox.__proto__ || Object.getPrototypeOf(ErrorableCheckbox)).call(this));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(ErrorableCheckbox, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.inputId = _uniqueId('errorable-checkbox-');
    }
  }, {
    key: 'handleChange',
    value: function handleChange(domEvent) {
      this.props.onValueChange(domEvent.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO: extract error logic into a utility function
      // Calculate error state.
      var errorSpan = '';
      var errorSpanId = undefined;
      if (this.props.errorMessage) {
        errorSpanId = this.inputId + '-error-message';
        errorSpan = React.createElement(
          'span',
          { className: 'usa-input-error-message', role: 'alert', id: errorSpanId },
          React.createElement(
            'span',
            { className: 'sr-only' },
            'Error'
          ),
          ' ',
          this.props.errorMessage
        );
      }

      // Calculate required.
      var requiredSpan = undefined;
      if (this.props.required) {
        requiredSpan = React.createElement(
          'span',
          { className: 'form-required-span' },
          '*'
        );
      }

      var className = 'form-checkbox' + (this.props.errorMessage ? ' usa-input-error' : '');
      if (!_isUndefined(this.props.className)) {
        className = className + ' ' + this.props.className;
      }

      return React.createElement(
        'div',
        { className: className },
        React.createElement('input', {
          autoComplete: 'false',
          'aria-describedby': errorSpanId,
          checked: this.props.checked,
          id: this.inputId,
          name: this.props.name,
          type: 'checkbox',
          onChange: this.handleChange }),
        React.createElement(
          'label',
          {
            className: this.props.errorMessage ? 'usa-input-error-label' : undefined,
            name: this.props.name + '-label',
            htmlFor: this.inputId },
          this.props.label,
          requiredSpan
        ),
        errorSpan
      );
    }
  }]);

  return ErrorableCheckbox;
}(React.Component);

ErrorableCheckbox.propTypes = {
  checked: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onValueChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export default ErrorableCheckbox;