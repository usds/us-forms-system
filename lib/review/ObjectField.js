import _set from 'lodash/fp/set';
import _values from 'lodash/fp/values';
import _groupBy from 'lodash/fp/groupBy';
import _get from 'lodash/fp/get';
import _flow from 'lodash/fp/flow';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';


import { getDefaultFormState, orderProperties, shouldRender, getDefaultRegistry } from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';

/*
 * This is largely copied from the react-jsonschema-form library,
 * but with the way descriptions are used changed
 */

var ObjectField = function (_React$Component) {
  _inherits(ObjectField, _React$Component);

  function ObjectField() {
    _classCallCheck(this, ObjectField);

    var _this = _possibleConstructorReturn(this, (ObjectField.__proto__ || Object.getPrototypeOf(ObjectField)).call(this));

    _this.isRequired = _this.isRequired.bind(_this);
    _this.orderAndFilterProperties = _flow(function (properties) {
      return orderProperties(properties, _get('ui:order', _this.props.uiSchema));
    }, _groupBy(function (item) {
      var expandUnderField = _get([item, 'ui:options', 'expandUnder'], _this.props.uiSchema);
      return expandUnderField || item;
    }), _values);
    return _this;
  }

  _createClass(ObjectField, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shouldRender(this, nextProps, nextState);
    }
  }, {
    key: 'onPropertyChange',
    value: function onPropertyChange(name) {
      var _this2 = this;

      return function (value) {
        var formData = Object.keys(_this2.props.formData || {}).length ? _this2.props.formData : getDefaultFormState(_this2.props.schema, undefined, _this2.props.registry.definitions);
        _this2.props.onChange(_set(name, value, formData));
      };
    }
  }, {
    key: 'getStateFromProps',
    value: function getStateFromProps(props) {
      var schema = props.schema,
          formData = props.formData,
          registry = props.registry;

      return getDefaultFormState(schema, formData, registry.definitions) || {};
    }
  }, {
    key: 'isRequired',
    value: function isRequired(name) {
      var schema = this.props.schema;
      return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          schema = _props.schema,
          formContext = _props.formContext;

      var SchemaField = this.props.registry.fields.SchemaField;

      var properties = Object.keys(schema.properties);
      var isRoot = idSchema.$id === 'root';
      var formData = this.props.formData || {};

      var renderField = function renderField(propName) {
        return React.createElement(SchemaField, { key: propName,
          name: propName,
          schema: schema.properties[propName],
          uiSchema: uiSchema[propName],
          errorSchema: errorSchema[propName],
          idSchema: idSchema[propName],
          onChange: _this3.onPropertyChange(propName),
          onBlur: _this3.props.onBlur,
          required: _this3.isRequired(propName),
          formData: formData[propName],
          registry: _this3.props.registry });
      };

      var showField = function showField(propName) {
        var hiddenOnSchema = schema.properties[propName]['ui:hidden'];
        var collapsedOnSchema = schema.properties[propName]['ui:collapsed'];
        var hideOnReviewIfFalse = _get([propName, 'ui:options', 'hideOnReviewIfFalse'], uiSchema) === true;
        var hideOnReview = _get([propName, 'ui:options', 'hideOnReview'], uiSchema) === true;
        return (!hideOnReviewIfFalse || !!formData[propName]) && !hideOnReview && !hiddenOnSchema && !collapsedOnSchema;
      };

      var renderedProperties = this.orderAndFilterProperties(properties).map(function (objectFields, index) {
        var _objectFields = _toArray(objectFields),
            first = _objectFields[0],
            rest = _objectFields.slice(1);
        // expand under functionality is controlled in the reducer by setting ui:collapsed, so
        // we can check if its expanded by seeing if there are any visible "children"


        var visible = rest.filter(function (prop) {
          return !_get(['properties', prop, 'ui:collapsed'], schema);
        });
        if (objectFields.length > 1 && visible.length > 0) {
          return objectFields.filter(showField).map(renderField);
        }
        return showField(first) ? renderField(first, index) : null;
      });

      if (isRoot) {
        var title = formContext.pageTitle;
        if (!formContext.hideTitle && typeof title === 'function') {
          title = title(formData, formContext);
        }
        return React.createElement(
          'div',
          null,
          !formContext.hideHeaderRow && React.createElement(
            'div',
            { className: 'form-review-panel-page-header-row' },
            React.createElement(
              'h5',
              { className: 'form-review-panel-page-header' },
              !formContext.hideTitle ? title : null
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'edit-btn primary-outline', onClick: function onClick() {
                  return formContext.onEdit();
                } },
              'Edit'
            )
          ),
          React.createElement(
            'dl',
            { className: 'review' },
            renderedProperties
          )
        );
      }

      return React.createElement(
        'div',
        null,
        renderedProperties
      );
    }
  }]);

  return ObjectField;
}(React.Component);

ObjectField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};


ObjectField.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  errorSchema: PropTypes.object,
  idSchema: PropTypes.object,
  formData: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  registry: PropTypes.shape({
    widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])).isRequired,
    fields: PropTypes.objectOf(PropTypes.func).isRequired,
    definitions: PropTypes.object.isRequired,
    formContext: PropTypes.object.isRequired
  })
};

export default ObjectField;