'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

var _SchemaForm = require('../components/SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _ui = require('../utilities/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = _reactScroll2.default.Element;
var scroller = _reactScroll2.default.scroller;

/* Growable table (Array) field on the Review page
 *
 * The idea here is that, because our pattern for growable tables on the review
 * page is that each item can be in review or edit mode, we will treat each item
 * as its own form page and this component will handle the edit/review states and
 * make sure data is properly updated in the Redux store
 */

var ArrayField = function (_React$Component) {
  _inherits(ArrayField, _React$Component);

  function ArrayField(props) {
    _classCallCheck(this, ArrayField);

    // In contrast to the normal array field, we don’t want to add an empty item
    // and always show at least one item on the review page
    var _this = _possibleConstructorReturn(this, (ArrayField.__proto__ || Object.getPrototypeOf(ArrayField)).call(this, props));

    var arrayData = Array.isArray(props.arrayData) ? props.arrayData : null;
    _this.state = {
      items: arrayData || [],
      editing: (_this.props.arrayData || []).map(function () {
        return false;
      })
    };
    _this.handleAdd = _this.handleAdd.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleSetData = _this.handleSetData.bind(_this);
    _this.scrollToTop = _this.scrollToTop.bind(_this);
    _this.scrollToRow = _this.scrollToRow.bind(_this);
    _this.isLocked = _this.isLocked.bind(_this);
    return _this;
  }

  _createClass(ArrayField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.arrayData !== this.props.arrayData) {
        var arrayData = Array.isArray(newProps.arrayData) ? newProps.arrayData : [];
        var newState = {
          items: arrayData
        };
        if (arrayData.length !== this.state.items.length) {
          newState.editing = arrayData.map(function () {
            return false;
          });
        }

        this.setState(newState);
      }
    }
  }, {
    key: 'getItemSchema',
    value: function getItemSchema(index) {
      var schema = this.props.schema;
      if (schema.items.length > index) {
        return schema.items[index];
      }

      return schema.additionalItems;
    }
  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      var _this2 = this;

      setTimeout(function () {
        // Hacky; won’t work if the array field is used in two pages and one isn’t
        //  a BasicArrayField nor if the array field is used in three pages.
        scroller.scrollTo('topOfTable_' + _this2.props.path[_this2.props.path.length - 1] + (_this2.isLocked() ? '_locked' : ''), window.Forms.scroll || {
          duration: 500,
          delay: 0,
          smooth: true,
          offset: -60
        });
      }, 100);
    }
  }, {
    key: 'scrollToRow',
    value: function scrollToRow(id) {
      setTimeout(function () {
        scroller.scrollTo('table_' + id, window.Forms.scroll || {
          duration: 500,
          delay: 0,
          smooth: true,
          offset: 0
        });
      }, 100);
    }

    /*
     * Clicking edit on the item in review mode
     */

  }, {
    key: 'handleEdit',
    value: function handleEdit(index) {
      var _this3 = this;

      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.setState((0, _set3.default)(['editing', index], status, this.state), function () {
        var id = _this3.props.path[_this3.props.path.length - 1] + '_' + index;
        _this3.scrollToRow(id);
        (0, _ui.focusElement)('#table_' + id);
      });
    }

    /*
     * Clicking Add Another in the header of the array field section
     */

  }, {
    key: 'handleAdd',
    value: function handleAdd() {
      var _this4 = this;

      var newState = {
        items: this.state.items.concat((0, _utils.getDefaultFormState)(this.getItemSchema(this.state.items.length), undefined, this.props.schema.definitions) || {}),
        editing: this.state.editing.concat(true)
      };
      this.setState(newState, function () {
        _this4.scrollToRow(_this4.props.path[_this4.props.path.length - 1] + '_' + (_this4.state.items.length - 1));
      });
    }

    /*
     * Clicking Remove when editing an item
     */

  }, {
    key: 'handleRemove',
    value: function handleRemove(indexToRemove) {
      var _this5 = this;

      var _props = this.props,
          path = _props.path,
          formData = _props.formData;

      var newState = (0, _assign3.default)(this.state, {
        items: this.state.items.filter(function (val, index) {
          return index !== indexToRemove;
        }),
        editing: this.state.editing.filter(function (val, index) {
          return index !== indexToRemove;
        })
      });
      this.setState(newState, function () {
        _this5.props.setData((0, _set3.default)(path, _this5.state.items, formData));
        _this5.scrollToTop();
      });
    }

    /*
     * Called on any form data change.
     *
     * When data is changed, since we’re only editing one array item at a time,
     * we need to update the full page’s form data and call the Redux setData action
     */

  }, {
    key: 'handleSetData',
    value: function handleSetData(index, data) {
      var _this6 = this;

      var _props2 = this.props,
          path = _props2.path,
          formData = _props2.formData;

      var newArray = (0, _set3.default)(index, data, this.state.items);
      this.setState({ items: newArray }, function () {
        _this6.props.setData((0, _set3.default)(path, newArray, formData));
      });
    }

    /*
     * Clicking Update in edit mode.
     *
     * This is only called if the form is valid
     * and data is already saved through handleSetData, so we just need to change
     * the edting state
     */

  }, {
    key: 'handleSave',
    value: function handleSave(index) {
      var _this7 = this;

      var newEditingArray = (0, _set3.default)(index, false, this.state.editing);
      this.setState({ editing: newEditingArray }, function () {
        _this7.scrollToTop();
      });
    }
  }, {
    key: 'isLocked',
    value: function isLocked() {
      return this.props.uiSchema['ui:field'] === 'BasicArrayField';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var _props3 = this.props,
          schema = _props3.schema,
          uiSchema = _props3.uiSchema,
          path = _props3.path,
          pageTitle = _props3.pageTitle,
          formContext = _props3.formContext;


      var uiOptions = uiSchema['ui:options'] || {};
      var fieldName = path[path.length - 1];
      var title = (0, _get3.default)('ui:title', uiSchema) || uiOptions.reviewTitle || pageTitle;
      var arrayPageConfig = {
        uiSchema: uiSchema.items,
        pageKey: fieldName
      };

      // TODO: Make this better; it’s super hacky for now.
      var itemCountLocked = this.isLocked();
      // Make sure we default to an empty array if the item count is locked and no
      //  arrayData is passed (mysteriously)
      var items = itemCountLocked ? this.props.arrayData || [] : this.state.items;
      var itemsNeeded = (schema.minItems || 0) > 0 && items.length === 0;

      return _react2.default.createElement(
        'div',
        { className: itemsNeeded ? 'schemaform-review-array-warning' : null },
        title && _react2.default.createElement(
          'div',
          { className: 'form-review-panel-page-header-row' },
          _react2.default.createElement(
            'h5',
            { className: 'form-review-panel-page-header' },
            title
          ),
          itemsNeeded && _react2.default.createElement('span', { className: 'schemaform-review-array-warning-icon' }),
          !itemCountLocked && _react2.default.createElement(
            'button',
            { type: 'button', className: 'edit-btn primary-outline', onClick: function onClick() {
                return _this8.handleAdd();
              } },
            'Add Another'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'usfs-growable usfs-growable-review' },
          _react2.default.createElement(Element, { name: 'topOfTable_' + fieldName + (itemCountLocked ? '_locked' : '') }),
          items.map(function (item, index) {
            var isLast = items.length === index + 1;
            var isEditing = _this8.state.editing[index];
            var showReviewButton = !itemCountLocked && (!schema.minItems || items.length > schema.minItems);
            var itemSchema = _this8.getItemSchema(index);
            var itemTitle = itemSchema ? itemSchema.title : '';

            if (isEditing) {
              return _react2.default.createElement(
                'div',
                { key: index, className: 'usfs-growable-background' },
                _react2.default.createElement(Element, { name: 'table_' + fieldName + '_' + index }),
                _react2.default.createElement(
                  'div',
                  { className: 'row small-collapse schemaform-array-row', id: 'table_' + fieldName + '_' + index },
                  _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns usfs-growable-expanded' },
                    isLast && uiOptions.itemName && items.length > 1 ? _react2.default.createElement(
                      'h5',
                      null,
                      'New ',
                      uiOptions.itemName
                    ) : null,
                    _react2.default.createElement(
                      _SchemaForm2.default,
                      {
                        data: item,
                        schema: itemSchema,
                        uiSchema: arrayPageConfig.uiSchema,
                        title: pageTitle,
                        hideTitle: true,
                        name: fieldName,
                        formContext: formContext,
                        onBlur: _this8.props.onBlur,
                        onChange: function onChange(data) {
                          return _this8.handleSetData(index, data);
                        },
                        onEdit: function onEdit() {
                          return _this8.handleEdit(index, !isEditing);
                        },
                        onSubmit: function onSubmit() {
                          return _this8.handleSave(index);
                        } },
                      _react2.default.createElement(
                        'div',
                        { className: 'row small-collapse' },
                        _react2.default.createElement(
                          'div',
                          { className: 'small-6 left columns' },
                          _react2.default.createElement(
                            'button',
                            { className: 'float-left' },
                            'Update'
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'small-6 right columns' },
                          showReviewButton && _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'usa-button-secondary float-right', onClick: function onClick() {
                                return _this8.handleRemove(index);
                              } },
                            'Remove'
                          )
                        )
                      )
                    )
                  )
                )
              );
            }
            return _react2.default.createElement(
              'div',
              { key: index, className: 'usfs-growable-background' },
              _react2.default.createElement(
                'div',
                { className: 'row small-collapse' },
                _react2.default.createElement(
                  _SchemaForm2.default,
                  {
                    reviewMode: true,
                    data: item,
                    schema: itemSchema,
                    uiSchema: arrayPageConfig.uiSchema,
                    title: itemTitle,
                    name: fieldName,
                    onChange: function onChange(data) {
                      return _this8.handleSetData(index, data);
                    },
                    onEdit: function onEdit() {
                      return _this8.handleEdit(index, !isEditing);
                    },
                    onSubmit: function onSubmit() {
                      return _this8.handleSave(index);
                    } },
                  _react2.default.createElement('div', null)
                )
              )
            );
          }),
          itemsNeeded && _react2.default.createElement(
            'div',
            { className: 'usa-alert usa-alert-warning usa-alert-no-color usa-alert-mini' },
            _react2.default.createElement(
              'div',
              { className: 'usa-alert-body' },
              (0, _get3.default)('ui:errorMessages.minItems', uiSchema) || 'You need to add at least one item.'
            )
          )
        )
      );
    }
  }]);

  return ArrayField;
}(_react2.default.Component);

exports.default = ArrayField;


ArrayField.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  uiSchema: _propTypes2.default.object,
  pageKey: _propTypes2.default.string.isRequired,
  path: _propTypes2.default.array.isRequired,
  formData: _propTypes2.default.object,
  arrayData: _propTypes2.default.array,
  pageTitle: _propTypes2.default.string
};
//# sourceMappingURL=ArrayField.js.map