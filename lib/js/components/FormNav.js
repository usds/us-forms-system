'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniq2 = require('lodash/fp/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowEqual = require('recompose/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _SegmentedProgressBar = require('./SegmentedProgressBar');

var _SegmentedProgressBar2 = _interopRequireDefault(_SegmentedProgressBar);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormNav = function (_React$Component) {
  _inherits(FormNav, _React$Component);

  function FormNav() {
    _classCallCheck(this, FormNav);

    return _possibleConstructorReturn(this, (FormNav.__proto__ || Object.getPrototypeOf(FormNav)).apply(this, arguments));
  }

  _createClass(FormNav, [{
    key: 'shouldComponentUpdate',

    // The formConfig transforming is a little heavy, so skip it if we can
    value: function shouldComponentUpdate(newProps) {
      return !(0, _shallowEqual2.default)(this.props, newProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          formConfig = _props.formConfig,
          currentPath = _props.currentPath,
          formData = _props.formData;

      // This is converting the config into a list of pages with chapter keys,
      // finding the current page, then getting the chapter name using the key

      var formPages = (0, _helpers.createFormPageList)(formConfig);
      var pageList = (0, _helpers.createPageList)(formConfig, formPages);

      var eligiblePageList = (0, _helpers.getActiveExpandedPages)(pageList, formData);

      var chapters = (0, _uniq3.default)(eligiblePageList.map(function (p) {
        return p.chapterKey;
      }).filter(function (key) {
        return !!key;
      }));

      var page = eligiblePageList.filter(function (p) {
        return p.path === currentPath;
      })[0];
      // If the page isn’t active, it won’t be in the eligiblePageList
      // This is a fallback to still find the chapter name if you open the page directly
      // (the chapter index will probably be wrong, but this isn’t a scenario that happens in normal use)
      if (!page) {
        page = formPages.find(function (p) {
          return '' + formConfig.urlPrefix + p.path === currentPath;
        });
      }

      var current = void 0;
      var chapterName = void 0;
      if (page) {
        current = chapters.indexOf(page.chapterKey) + 1;
        // The review page is always part of our forms, but isn’t listed in chapter list
        chapterName = page.chapterKey === 'review' ? 'Review Application' : formConfig.chapters[page.chapterKey].title;
        if (typeof chapterName === 'function') {
          chapterName = chapterName();
        }
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_SegmentedProgressBar2.default, { total: chapters.length, current: current }),
        _react2.default.createElement(
          'div',
          { className: 'schemaform-chapter-progress' },
          _react2.default.createElement(
            'div',
            {
              role: 'progressbar',
              'aria-valuenow': current,
              'aria-valuemin': '1',
              'aria-valuetext': 'Step ' + current + ' of ' + chapters.length + ': ' + chapterName,
              'aria-valuemax': chapters.length,
              className: 'nav-header nav-header-schemaform' },
            _react2.default.createElement(
              'h4',
              null,
              _react2.default.createElement(
                'span',
                { className: 'form-process-step current' },
                current
              ),
              ' ',
              _react2.default.createElement(
                'span',
                { className: 'form-process-total' },
                'of ',
                chapters.length
              ),
              ' ',
              chapterName
            )
          )
        )
      );
    }
  }]);

  return FormNav;
}(_react2.default.Component);

exports.default = FormNav;
//# sourceMappingURL=FormNav.js.map