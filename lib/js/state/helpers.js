import _merge from 'lodash/fp/merge';
import _get from 'lodash/fp/get';
import _dropRight from 'lodash/fp/dropRight';
import _assign from 'lodash/fp/assign';
import _unset from 'lodash/fp/unset';
import _set from 'lodash/fp/set';

import { getDefaultFormState } from '@department-of-veterans-affairs/react-jsonschema-form/lib/utils';

import { checkValidSchema, createFormPageList } from '../helpers';

function isHiddenField(schema) {
  return !!schema['ui:collapsed'] || !!schema['ui:hidden'];
}

function get(path, data) {
  return path.reduce(function (current, next) {
    return typeof current === 'undefined' ? current : current[next];
  }, data);
}

/*
 * This function goes through a schema/uiSchema and updates the required array
 * based on any ui:required field properties in the uiSchema.
 *
 * If no required fields are changing, it makes sure to not mutate the existing schema,
 * so we can still take advantage of any shouldComponentUpdate optimizations
 */
export function updateRequiredFields(schema, uiSchema, formData) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (!uiSchema) {
    return schema;
  }

  if (schema.type === 'object') {
    var newRequired = Object.keys(schema.properties).reduce(function (requiredArray, nextProp) {
      var field = uiSchema[nextProp];
      if (field && field['ui:required']) {
        var isRequired = field['ui:required'](formData, index);
        var arrayHasField = requiredArray.some(function (prop) {
          return prop === nextProp;
        });

        if (arrayHasField && !isRequired) {
          return requiredArray.filter(function (prop) {
            return prop !== nextProp;
          });
        } else if (!arrayHasField && isRequired) {
          return requiredArray.concat(nextProp);
        }

        return requiredArray;
      }

      return requiredArray;
    }, schema.required || []);

    var newSchema = Object.keys(schema.properties).reduce(function (currentSchema, nextProp) {
      if (uiSchema) {
        var nextSchema = updateRequiredFields(currentSchema.properties[nextProp], uiSchema[nextProp], formData, index);
        if (nextSchema !== currentSchema.properties[nextProp]) {
          return _set(['properties', nextProp], nextSchema, currentSchema);
        }
      }

      return currentSchema;
    }, schema);

    if (newSchema.required !== newRequired && (newSchema.required || newRequired.length > 0)) {
      return _set('required', newRequired, newSchema);
    }

    return newSchema;
  }

  if (schema.type === 'array') {
    // each item has its own schema, so we need to update the required fields on those schemas
    // and then check for differences
    var newItemSchemas = schema.items.map(function (item, idx) {
      return updateRequiredFields(item, uiSchema.items, formData, idx);
    });
    if (newItemSchemas.some(function (newItem, idx) {
      return newItem !== schema.items[idx];
    })) {
      return _set('items', newItemSchemas, schema);
    }
  }

  return schema;
}

export function isContentExpanded(data, matcher) {
  if (typeof matcher === 'undefined') {
    return !!data;
  } else if (typeof matcher === 'function') {
    return matcher(data);
  }

  return data === matcher;
}

/*
 * This steps through a schema and sets any fields to hidden, based on a
 * hideIf function from uiSchema and the current page data. Sets 'ui:hidden'
 * which is a non-standard JSON Schema property
 *
 * The path parameter will contain the path, relative to formData, to the
 * form data corresponding to the current schema object
 */
export function setHiddenFields(schema, uiSchema, formData) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (!uiSchema) {
    return schema;
  }

  // expandUnder fields are relative to the parent object of the current
  // field, so get that object using path here
  var containingObject = get(path.slice(0, -1), formData) || formData;

  var updatedSchema = schema;
  var hideIf = get(['ui:options', 'hideIf'], uiSchema);
  var index = path.reduce(function (current, next) {
    return typeof next === 'number' ? next : current;
  }, null);

  if (hideIf && hideIf(formData, index)) {
    if (!updatedSchema['ui:hidden']) {
      updatedSchema = _set('ui:hidden', true, updatedSchema);
    }
  } else if (updatedSchema['ui:hidden']) {
    updatedSchema = _unset('ui:hidden', updatedSchema);
  }

  var expandUnder = get(['ui:options', 'expandUnder'], uiSchema);
  var expandUnderCondition = get(['ui:options', 'expandUnderCondition'], uiSchema);
  if (expandUnder && !isContentExpanded(containingObject[expandUnder], expandUnderCondition)) {
    if (!updatedSchema['ui:collapsed']) {
      updatedSchema = _set('ui:collapsed', true, updatedSchema);
    }
  } else if (updatedSchema['ui:collapsed']) {
    updatedSchema = _unset('ui:collapsed', updatedSchema);
  }

  if (updatedSchema.type === 'object') {
    var newProperties = Object.keys(updatedSchema.properties).reduce(function (current, next) {
      var newSchema = setHiddenFields(updatedSchema.properties[next], uiSchema[next], formData, path.concat(next));

      if (newSchema !== updatedSchema.properties[next]) {
        return _set(next, newSchema, current);
      }

      return current;
    }, updatedSchema.properties);

    if (newProperties !== updatedSchema.properties) {
      return _set('properties', newProperties, updatedSchema);
    }
  }

  if (updatedSchema.type === 'array') {
    // each item has its own schema, so we need to update the required fields on those schemas
    // and then check for differences
    var newItemSchemas = updatedSchema.items.map(function (item, idx) {
      return setHiddenFields(item, uiSchema.items, formData, path.concat(idx));
    });

    if (newItemSchemas.some(function (newItem, idx) {
      return newItem !== updatedSchema.items[idx];
    })) {
      return _set('items', newItemSchemas, updatedSchema);
    }
  }

  return updatedSchema;
}

/*
 * Steps through data and removes any fields that are marked as hidden
 * This is done so that hidden fields don’t cause validation errors that
 * a user can’t see.
 */
export function removeHiddenData(schema, data) {
  // null is necessary here because Rails 4 will convert empty arrays to null
  // In the forms, there's no difference between an empty array and null or undefined
  if (isHiddenField(schema) || typeof data === 'undefined' || data === null) {
    return undefined;
  }

  if (schema.type === 'object') {
    return Object.keys(data).reduce(function (current, next) {
      if (typeof data[next] !== 'undefined' && schema.properties[next]) {
        var nextData = removeHiddenData(schema.properties[next], data[next]);

        // if the data was removed, then just unset it
        if (typeof nextData === 'undefined') {
          return _unset(next, current);
        }

        // if data was updated (like a nested prop was removed), update it
        if (nextData !== data[next]) {
          return _set(next, nextData, current);
        }
      }

      return current;
    }, data);
  }

  if (schema.type === 'array') {
    var newItems = data.map(function (item, index) {
      return removeHiddenData(schema.items[index], item);
    });

    if (newItems.some(function (newItem, idx) {
      return newItem !== data[idx];
    })) {
      return newItems;
    }

    return data;
  }

  return data;
}

/*
 * This is similar to the hidden fields schema function above, except more general.
 * It will step through a schema and replace parts of it based on an updateSchema
 * function in uiSchema. This means the schema can be re-calculated based on data
 * a user has entered.
 */
export function updateSchemaFromUiSchema(schema, uiSchema, formData) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  if (!uiSchema) {
    return schema;
  }

  var currentSchema = schema;

  if (currentSchema.type === 'object') {
    var newSchema = Object.keys(currentSchema.properties).reduce(function (current, next) {
      var nextProp = updateSchemaFromUiSchema(current.properties[next], uiSchema[next], formData, index, path.concat(next));

      if (current.properties[next] !== nextProp) {
        return _set(['properties', next], nextProp, current);
      }

      return current;
    }, currentSchema);

    if (newSchema !== schema) {
      currentSchema = newSchema;
    }
  }

  if (currentSchema.type === 'array') {
    // each item has its own schema, so we need to update the required fields on those schemas
    // and then check for differences
    var newItemSchemas = currentSchema.items.map(function (item, idx) {
      return updateSchemaFromUiSchema(item, uiSchema.items, formData, idx, path.concat(idx));
    });

    if (newItemSchemas.some(function (newItem, idx) {
      return newItem !== currentSchema.items[idx];
    })) {
      currentSchema = _set('items', newItemSchemas, currentSchema);
    }
  }

  var updateSchema = get(['ui:options', 'updateSchema'], uiSchema);

  if (updateSchema) {
    var newSchemaProps = updateSchema(formData, currentSchema, uiSchema, index, path);

    var _newSchema = Object.keys(newSchemaProps).reduce(function (current, next) {
      if (newSchemaProps[next] !== schema[next]) {
        return _set(next, newSchemaProps[next], current);
      }

      return current;
    }, currentSchema);

    if (_newSchema !== currentSchema) {
      return _newSchema;
    }
  }

  return currentSchema;
}

export function replaceRefSchemas(schema, definitions) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  // this can happen if you import a field that doesn’t exist from a schema
  if (!schema) {
    throw new Error('Schema is undefined at ' + path);
  }
  if (schema.$ref) {
    // There’s a whole spec for JSON pointers, but we don’t use anything more complicated
    // than this so far
    var refPath = schema.$ref.replace('#/definitions/', '').split('/');
    var definition = get(refPath, definitions);
    if (!definition) {
      throw new Error('Missing definition for ' + schema.$ref + ' at ' + path + '. You probably need to add it to defaultDefinitions');
    }

    return replaceRefSchemas(definition, definitions, path);
  }

  if (schema.type === 'object') {
    var newSchema = Object.keys(schema.properties).reduce(function (current, next) {
      var nextProp = replaceRefSchemas(schema.properties[next], definitions, path + '.' + next);

      if (current.properties[next] !== nextProp) {
        return _set(['properties', next], nextProp, current);
      }

      return current;
    }, schema);

    return newSchema;
  }

  if (schema.type === 'array') {
    var newItems = replaceRefSchemas(schema.items, definitions, path + '.items');

    if (newItems !== schema.items) {
      return _set('items', newItems, schema);
    }
  }

  return schema;
}

/**
 * This function updates an array schema to use the array of
 * item schema format and keeps that array in sync with the
 * data in that array in the form data.
 *
 * This allows us to have conditional fields for each array item,
 * because our conditional field implementation depends on modifying
 * schemas
 *
 * @param {Object} schema The current JSON Schema object
 * @param {any} fieldData The data associated with the current schema
 */
export function updateItemsSchema(schema) {
  var fieldData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (schema.type === 'array') {
    var newSchema = schema;

    // This happens the first time this function is called when
    // generating the form
    if (!Array.isArray(schema.items)) {
      newSchema = _assign(schema, {
        items: [],
        additionalItems: schema.items
      });
    }

    if (!fieldData) {
      // If there’s no data, the list of schemas should be empty
      newSchema = _set('items', [], newSchema);
    } else if (fieldData.length > newSchema.items.length) {
      // Here we’re filling in the items array to make it the same
      // length as the array of form data. This happens when you add
      // another record on the form, mainly.
      var fillIn = Array(fieldData.length - newSchema.items.length).fill(newSchema.additionalItems);
      newSchema = _set('items', newSchema.items.concat(fillIn), newSchema);
    } else if (fieldData.length < newSchema.items.length) {
      // If someone removed a record we’re removing the last schema item
      // This may not be the actual removed schema, but the schemas will
      // always be updated in the next step
      newSchema = _set('items', _dropRight(1, newSchema.items), newSchema);
    }

    var updatedItems = newSchema.items.map(function (item, index) {
      return updateItemsSchema(item, fieldData[index]);
    });
    if (newSchema.items.some(function (item, index) {
      return item !== updatedItems[index];
    })) {
      return _set('items', updatedItems, newSchema);
    }

    return newSchema;
  }

  if (schema.type === 'object') {
    var _newSchema2 = Object.keys(schema.properties).reduce(function (current, next) {
      var nextProp = updateItemsSchema(schema.properties[next], fieldData ? fieldData[next] : null);

      if (current.properties[next] !== nextProp) {
        return _set(['properties', next], nextProp, current);
      }

      return current;
    }, schema);

    return _newSchema2;
  }

  return schema;
}

/**
 * This is the main sequence of updates that happens when data is changed
 * on a form. Most updates are applied to the schema, except that the data
 * is updated to remove newly hidden data
 *
 * @param {Object} schema The current JSON Schema
 * @param {Object} uiSchema The current UI Schema (does not change)
 * @param {Object} formData Flattened data for the entire form
 */
export function updateSchemaAndData(schema, uiSchema, formData) {
  var newSchema = updateItemsSchema(schema, formData);
  newSchema = updateRequiredFields(newSchema, uiSchema, formData);

  // Update the schema with any fields that are now hidden because of the data change
  newSchema = setHiddenFields(newSchema, uiSchema, formData);

  // Update the schema with any general updates based on the new data
  newSchema = updateSchemaFromUiSchema(newSchema, uiSchema, formData);

  // Remove any data that’s now hidden in the schema
  var newData = removeHiddenData(newSchema, formData);

  // We need to do this again because array data might have been removed
  newSchema = updateItemsSchema(newSchema, newData);

  checkValidSchema(newSchema);

  return {
    data: newData,
    schema: newSchema
  };
}

export function recalculateSchemaAndData(initialState) {
  return Object.keys(initialState.pages).reduce(function (state, pageKey) {
    // on each data change, we need to do the following steps
    // Recalculate any required fields, based on the new data
    var page = state.pages[pageKey];
    var formData = initialState.data;

    var _updateSchemaAndData = updateSchemaAndData(page.schema, page.uiSchema, formData),
        data = _updateSchemaAndData.data,
        schema = _updateSchemaAndData.schema;

    var newState = state;

    if (formData !== data) {
      newState = _set('data', data, state);
    }

    if (page.schema !== schema) {
      newState = _set(['pages', pageKey, 'schema'], schema, newState);
    }

    if (page.showPagePerItem) {
      var arrayData = _get(page.arrayPath, newState.data) || [];
      // If an item was added or removed for the data used by a showPagePerItem page,
      // we have to reset everything because we can’t match the edit states to rows directly
      // This will rarely ever be noticeable
      if (page.editMode.length !== arrayData.length) {
        newState = _set(['pages', pageKey, 'editMode'], arrayData.map(function () {
          return false;
        }), newState);
      }
    }

    return newState;
  }, initialState);
}

export function createInitialState(formConfig) {
  var initialState = {
    submission: {
      status: false,
      errorMessage: false,
      id: false,
      timestamp: false,
      hasAttemptedSubmit: false
    },
    formId: formConfig.formId,
    loadedData: {
      formData: {},
      metadata: {}
    },
    reviewPageView: {
      openChapters: [],
      viewedPages: new Set()
    },
    trackingPrefix: formConfig.trackingPrefix
  };

  var pageAndDataState = createFormPageList(formConfig).reduce(function (state, page) {
    var definitions = _assign(formConfig.defaultDefinitions || {}, page.schema.definitions);
    var schema = replaceRefSchemas(page.schema, definitions, page.pageKey);
    // Throw an error if the new schema is invalid
    checkValidSchema(schema);
    schema = updateItemsSchema(schema);
    var isArrayPage = page.showPagePerItem;
    var data = getDefaultFormState(schema, page.initialData, schema.definitions);

    /* eslint-disable no-param-reassign */
    state.pages[page.pageKey] = {
      uiSchema: page.uiSchema,
      schema: schema,
      editMode: isArrayPage ? [] : false,
      showPagePerItem: page.showPagePerItem,
      arrayPath: page.arrayPath,
      itemFilter: page.itemFilter
    };

    state.data = _merge(state.data, data);
    /* eslint-enable no-param-reassign */

    return state;
  }, {
    data: {
      privacyAgreementAccepted: false
    },
    pages: {}
  });

  initialState = _assign(initialState, pageAndDataState);
  // Take another pass and recalculate the schema and data based on the default data
  // We do this to avoid passing undefined for the whole form state when the form first renders
  initialState = recalculateSchemaAndData(initialState);

  return initialState;
}