'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _set2 = require('lodash/fp/set');

var _set3 = _interopRequireDefault(_set2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactScroll = require('react-scroll');

var _reactScroll2 = _interopRequireDefault(_reactScroll);

var _utils = require('@department-of-veterans-affairs/react-jsonschema-form/lib/utils');

var _ui = require('../utilities/ui');

var _helpers = require('../helpers');

var _validation = require('../validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = _reactScroll2.default.Element;
var scroller = _reactScroll2.default.scroller;

/* Non-review growable table (array) field */

var ArrayField = function (_React$Component) {
  _inherits(ArrayField, _React$Component);

  function ArrayField(props) {
    _classCallCheck(this, ArrayField);

    // Throw an error if there’s no viewField (should be React component)
    var _this = _possibleConstructorReturn(this, (ArrayField.__proto__ || Object.getPrototypeOf(ArrayField)).call(this, props));

    if (typeof _this.props.uiSchema['ui:options'].viewField !== 'function') {
      throw new Error('No viewField found in uiSchema for ArrayField ' + _this.props.idSchema.$id + '.');
    }

    /*
     * We’re keeping the editing state in local state because it’s easier to manage and
     * doesn’t need to persist from page to page
     */

    _this.state = {
      editing: props.formData ? props.formData.map(function () {
        return false;
      }) : [true]
    };

    _this.onItemChange = _this.onItemChange.bind(_this);
    _this.handleAdd = _this.handleAdd.bind(_this);
    _this.handleEdit = _this.handleEdit.bind(_this);
    _this.handleUpdate = _this.handleUpdate.bind(_this);
    _this.handleRemove = _this.handleRemove.bind(_this);
    _this.scrollToTop = _this.scrollToTop.bind(_this);
    _this.scrollToRow = _this.scrollToRow.bind(_this);
    return _this;
  }

  // This fills in an empty item in the array if it has minItems set
  // so that schema validation runs against the fields in the first item
  // in the array. This shouldn’t be necessary, but there’s a fix in rjsf
  // that has not been released yet


  _createClass(ArrayField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          schema = _props.schema,
          _props$formData = _props.formData,
          formData = _props$formData === undefined ? [] : _props$formData,
          registry = _props.registry;

      if (schema.minItems > 0 && formData.length === 0) {
        this.props.onChange(Array(schema.minItems).fill((0, _utils.getDefaultFormState)(schema.additionalItems, undefined, registry.definitions)));
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utils.deepEquals)(this.props, nextProps) || nextState !== this.state;
    }
  }, {
    key: 'onItemChange',
    value: function onItemChange(indexToChange, value) {
      var newItems = (0, _set3.default)(indexToChange, value, this.props.formData || []);
      this.props.onChange(newItems);
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
        scroller.scrollTo('topOfTable_' + _this2.props.idSchema.$id, window.Forms.scroll || {
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
     * Clicking edit on an item that’s not last and so is in view mode
     */

  }, {
    key: 'handleEdit',
    value: function handleEdit(index) {
      var _this3 = this;

      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.setState((0, _set3.default)(['editing', index], status, this.state), function () {
        _this3.scrollToRow(_this3.props.idSchema.$id + '_' + index);
      });
    }

    /*
     * Clicking Update on an item that’s not last and is in edit mode
     */

  }, {
    key: 'handleUpdate',
    value: function handleUpdate(index) {
      var _this4 = this;

      if ((0, _validation.errorSchemaIsValid)(this.props.errorSchema[index])) {
        this.setState((0, _set3.default)(['editing', index], false, this.state), function () {
          _this4.scrollToTop();
        });
      } else {
        // Set all the fields for this item as touched, so we show errors
        var touched = (0, _helpers.setArrayRecordTouched)(this.props.idSchema.$id, index);
        this.props.formContext.setTouched(touched, function () {
          (0, _ui.scrollToFirstError)();
        });
      }
    }

    /*
     * Clicking Add Another
     */

  }, {
    key: 'handleAdd',
    value: function handleAdd() {
      var _this5 = this;

      var lastIndex = this.props.formData.length - 1;
      if ((0, _validation.errorSchemaIsValid)(this.props.errorSchema[lastIndex])) {
        // When we add another, we want to change the editing state of the currently
        // last item, but not ones above it
        var newEditing = this.state.editing.map(function (val, index) {
          return index + 1 === _this5.state.editing.length ? false : val;
        });
        var editingState = this.props.uiSchema['ui:options'].reviewMode;
        var newState = (0, _assign3.default)(this.state, {
          editing: newEditing.concat(!!editingState)
        });
        this.setState(newState, function () {
          var newFormData = _this5.props.formData.concat((0, _utils.getDefaultFormState)(_this5.props.schema.additionalItems, undefined, _this5.props.registry.definitions) || {});
          _this5.props.onChange(newFormData);
          _this5.scrollToRow(_this5.props.idSchema.$id + '_' + (lastIndex + 1));
        });
      } else {
        var touched = (0, _helpers.setArrayRecordTouched)(this.props.idSchema.$id, lastIndex);
        this.props.formContext.setTouched(touched, function () {
          (0, _ui.scrollToFirstError)();
        });
      }
    }

    /*
     * Clicking Remove on an item in edit mode
     */

  }, {
    key: 'handleRemove',
    value: function handleRemove(indexToRemove) {
      var _this6 = this;

      var newItems = this.props.formData.filter(function (val, index) {
        return index !== indexToRemove;
      });
      var newState = (0, _assign3.default)(this.state, {
        editing: this.state.editing.filter(function (val, index) {
          return index !== indexToRemove;
        })
      });
      this.props.onChange(newItems);
      this.setState(newState, function () {
        _this6.scrollToTop();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _props2 = this.props,
          uiSchema = _props2.uiSchema,
          errorSchema = _props2.errorSchema,
          idSchema = _props2.idSchema,
          formData = _props2.formData,
          disabled = _props2.disabled,
          readonly = _props2.readonly,
          registry = _props2.registry,
          formContext = _props2.formContext,
          onBlur = _props2.onBlur,
          schema = _props2.schema;

      var definitions = registry.definitions;
      var _registry$fields = registry.fields,
          TitleField = _registry$fields.TitleField,
          SchemaField = _registry$fields.SchemaField;


      var uiOptions = uiSchema['ui:options'] || {};
      var ViewField = uiOptions.viewField;
      var title = uiSchema['ui:title'] || schema.title;
      var hideTitle = !!uiOptions.title;
      var description = uiSchema['ui:description'];
      var textDescription = typeof description === 'string' ? description : null;
      var DescriptionField = typeof description === 'function' ? uiSchema['ui:description'] : null;
      var isReviewMode = uiSchema['ui:options'].reviewMode;
      var hasTitleOrDescription = !!title && !hideTitle || !!description;

      // if we have form data, use that, otherwise use an array with a single default object
      var items = formData && formData.length ? formData : [(0, _utils.getDefaultFormState)(schema, undefined, registry.definitions)];

      var containerClassNames = (0, _classnames2.default)({
        'schemaform-field-container': true,
        'schemaform-block': hasTitleOrDescription
      });

      return _react2.default.createElement(
        'div',
        { className: containerClassNames },
        hasTitleOrDescription && _react2.default.createElement(
          'div',
          { className: 'schemaform-block-header' },
          title && !hideTitle ? _react2.default.createElement(TitleField, {
            id: idSchema.$id + '__title',
            title: title,
            formContext: formContext }) : null,
          textDescription && _react2.default.createElement(
            'p',
            null,
            textDescription
          ),
          DescriptionField && _react2.default.createElement(DescriptionField, { options: uiSchema['ui:options'] }),
          !textDescription && !DescriptionField && description
        ),
        _react2.default.createElement(
          'div',
          { className: 'usfs-growable' },
          _react2.default.createElement(Element, { name: 'topOfTable_' + idSchema.$id }),
          items.map(function (item, index) {
            // This is largely copied from the default ArrayField
            var itemSchema = _this7.getItemSchema(index);
            var itemIdPrefix = idSchema.$id + '_' + index;
            var itemIdSchema = (0, _utils.toIdSchema)(itemSchema, itemIdPrefix, definitions);
            var isLast = items.length === index + 1;
            var isEditing = _this7.state.editing[index];
            var notLastOrMultipleRows = !isLast || items.length > 1;

            if (isReviewMode ? isEditing : isLast || isEditing) {
              return _react2.default.createElement(
                'div',
                { key: index, className: notLastOrMultipleRows ? 'usfs-growable-background' : null },
                _react2.default.createElement(Element, { name: 'table_' + itemIdPrefix }),
                _react2.default.createElement(
                  'div',
                  { className: 'row small-collapse' },
                  _react2.default.createElement(
                    'div',
                    { className: 'small-12 columns usfs-growable-expanded' },
                    isLast && items.length > 1 && uiSchema['ui:options'].itemName ? _react2.default.createElement(
                      'h5',
                      null,
                      'New ',
                      uiSchema['ui:options'].itemName
                    ) : null,
                    _react2.default.createElement(
                      'div',
                      { className: 'input-section' },
                      _react2.default.createElement(SchemaField, { key: index,
                        schema: itemSchema,
                        uiSchema: uiSchema.items,
                        errorSchema: errorSchema ? errorSchema[index] : undefined,
                        idSchema: itemIdSchema,
                        formData: item,
                        onChange: function onChange(value) {
                          return _this7.onItemChange(index, value);
                        },
                        onBlur: onBlur,
                        registry: _this7.props.registry,
                        required: false,
                        disabled: disabled,
                        readonly: readonly })
                    ),
                    notLastOrMultipleRows && _react2.default.createElement(
                      'div',
                      { className: 'row small-collapse' },
                      _react2.default.createElement(
                        'div',
                        { className: 'small-6 left columns' },
                        !isLast && _react2.default.createElement(
                          'button',
                          { className: 'float-left', onClick: function onClick() {
                              return _this7.handleUpdate(index);
                            } },
                          'Update'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'small-6 right columns' },
                        _react2.default.createElement(
                          'button',
                          { className: 'usa-button-secondary float-right', type: 'button', onClick: function onClick() {
                              return _this7.handleRemove(index);
                            } },
                          'Remove'
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
                  'div',
                  { className: 'small-9 columns' },
                  _react2.default.createElement(ViewField, {
                    formData: item,
                    onEdit: function onEdit() {
                      return _this7.handleEdit(index);
                    } })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'small-3 columns' },
                  _react2.default.createElement(
                    'button',
                    { className: 'usa-button-secondary float-right', onClick: function onClick() {
                        return _this7.handleEdit(index);
                      } },
                    'Edit'
                  )
                )
              )
            );
          }),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: (0, _classnames2.default)('usa-button-secondary', 'usfs-growable-add-btn', {
                'usa-button-disabled': !this.props.formData
              }),
              disabled: !this.props.formData,
              onClick: this.handleAdd },
            'Add Another ',
            uiOptions.itemName
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
  errorSchema: _propTypes2.default.object,
  requiredSchema: _propTypes2.default.object,
  idSchema: _propTypes2.default.object,
  onChange: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func,
  formData: _propTypes2.default.array,
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  registry: _propTypes2.default.shape({
    widgets: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object])).isRequired,
    fields: _propTypes2.default.objectOf(_propTypes2.default.func).isRequired,
    definitions: _propTypes2.default.object.isRequired,
    formContext: _propTypes2.default.object.isRequired
  })
};
//# sourceMappingURL=ArrayField.js.map