var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

var ESCAPE_KEY = 27;

function focusListener(selector) {
  var listener = function listener(event) {
    var modal = document.querySelector('.va-modal');
    if (!modal.contains(event.target)) {
      event.stopPropagation();
      var focusableElement = modal.querySelector(selector);
      if (focusableElement) {
        focusableElement.focus();
      }
    }
  };
  document.addEventListener('focus', listener, true);
  return listener;
}

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleDocumentKeyUp = _this.handleDocumentKeyUp.bind(_this);
    _this.state = { lastFocus: null, focusListener: null };
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.visible) {
        document.body.classList.add('modal-open');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.visible && !this.props.visible) {
        document.addEventListener('keyup', this.handleDocumentKeyUp, false);
        this.setState({ lastFocus: document.activeElement, focusListener: focusListener(newProps.focusSelector) });
      } else if (!newProps.visible && this.props.visible) {
        document.removeEventListener('keyup', this.handleDocumentKeyUp, false);
        document.removeEventListener('focus', this.state.focusListener, true);
        this.state.lastFocus.focus();
        document.body.classList.remove('modal-open');
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.visible && this.props.visible) {
        var focusableElement = document.querySelector('.va-modal').querySelector(this.props.focusSelector);
        if (focusableElement) {
          focusableElement.focus();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keyup', this.handleDocumentKeyUp, false);
      document.removeEventListener('focus', this.state.focusListener, true);
      document.body.classList.remove('modal-open');
    }
  }, {
    key: 'handleDocumentKeyUp',
    value: function handleDocumentKeyUp(event) {
      if (event.keyCode === ESCAPE_KEY) {
        this.handleClose(event);
      }
    }
  }, {
    key: 'handleClose',
    value: function handleClose(e) {
      e.preventDefault();
      this.props.onClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          title = _props.title,
          visible = _props.visible;

      var alertClass = classNames('usa-alert', 'usa-alert-' + this.props.status);

      var titleClass = classNames('va-modal-title', 'va-modal-title-' + this.props.status);

      var modalCss = classNames('va-modal', this.props.cssClass);
      var modalTitle = title && React.createElement(
        'div',
        { className: alertClass },
        React.createElement(
          'h3',
          { id: id + '-title', className: titleClass },
          title
        )
      );

      if (!visible) {
        return React.createElement('div', null);
      }

      var closeButton = void 0;
      if (!this.props.hideCloseButton) {
        closeButton = React.createElement(
          'button',
          {
            className: 'va-modal-close',
            type: 'button',
            onClick: this.handleClose },
          React.createElement('i', { className: 'fa fa-close' }),
          React.createElement(
            'span',
            { className: 'usa-sr-only' },
            'Close this modal'
          )
        );
      }

      return React.createElement(
        'div',
        { className: modalCss, id: id, role: 'alertdialog', 'aria-labelledby': id + '-title' },
        React.createElement(
          'div',
          { className: 'va-modal-inner' },
          modalTitle,
          closeButton,
          React.createElement(
            'div',
            { className: 'va-modal-body' },
            React.createElement(
              'div',
              null,
              this.props.contents || this.props.children
            ),
            React.createElement(
              'div',
              { className: 'alert-actions' },
              this.props.primaryButton && React.createElement(
                'button',
                { className: 'usa-button', onClick: this.props.primaryButton.action },
                this.props.primaryButton.text
              ),
              this.props.secondaryButton && React.createElement(
                'button',
                { className: 'usa-button-secondary', onClick: this.props.secondaryButton.action },
                this.props.secondaryButton.text
              )
            )
          )
        )
      );
    }
  }]);

  return Modal;
}(React.Component);

Modal.propTypes = {
  contents: PropTypes.node, /* alternatively used child nodes */
  cssClass: PropTypes.string,
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  hideCloseButton: PropTypes.bool,
  focusSelector: PropTypes.string,
  primaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }),
  secondaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }),
  status: PropTypes.oneOf(['info', 'error', 'success', 'warning'])
};

Modal.defaultProps = {
  focusSelector: 'button, input, select, a'
};

export default Modal;