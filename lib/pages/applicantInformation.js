import _pick from 'lodash/fp/pick';
import _assign from 'lodash/fp/assign';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import applicantDescription from '../components/ApplicantDescription';

import currentOrPastDateUI from '../definitions/currentOrPastDate';
import fullNameUI from '../definitions/fullName';

import { relationshipLabels, genderLabels } from '../utils/labels';
import * as personId from '../definitions/personId';

var defaults = function defaults(prefix) {
  return {
    fields: [prefix + 'FullName', prefix + 'SocialSecurityNumber', 'view:noSSN', prefix + 'DateOfBirth', 'gender', 'relationship'],
    required: [prefix + 'FullName', prefix + 'DateOfBirth', 'relationship'],
    labels: {},
    isVeteran: false
  };
};

/**
 * Returns an applicantInformation page based on the options passed.
 *
 * @param {Object} schema   The full schema for the form
 * @param {Object} options  Options to override the defaults above
 */
export default function applicantInformation(schema, options) {
  var _assign2;

  // Use the defaults as necessary, but override with the options given
  var prefix = options && options.isVeteran ? 'veteran' : 'relative';
  var mergedOptions = _assign(defaults(prefix), options);
  var fields = mergedOptions.fields,
      required = mergedOptions.required,
      labels = mergedOptions.labels;


  var possibleProperties = _assign(schema.properties, {
    'view:noSSN': {
      type: 'boolean'
    }
  });

  return {
    path: 'applicant/information',
    title: 'Applicant information',
    initialData: {},
    uiSchema: _assign((_assign2 = {
      'ui:order': fields,
      'ui:description': applicantDescription
    }, _defineProperty(_assign2, prefix + 'FullName', fullNameUI), _defineProperty(_assign2, prefix + 'DateOfBirth', _assign(currentOrPastDateUI('Date of birth'), {
      'ui:errorMessages': {
        pattern: 'Please provide a valid date',
        futureDate: 'Please provide a valid date'
      }
    })), _defineProperty(_assign2, 'gender', {
      'ui:widget': 'radio',
      'ui:title': 'Gender',
      'ui:options': {
        labels: labels.gender || genderLabels
      }
    }), _defineProperty(_assign2, 'relationship', {
      'ui:widget': 'radio',
      'ui:title': 'What’s your relationship to the Servicemember whose benefit is being transferred to you?',
      'ui:options': {
        labels: labels.relationship || relationshipLabels
      }
    }), _assign2), personId.uiSchema(prefix, 'view:noSSN')),
    schema: {
      type: 'object',
      definitions: _pick(['fullName', 'relationship', 'ssn', 'gender', 'date', 'vaFileNumber'], schema.definitions),
      required: required,
      properties: _pick(fields, possibleProperties)
    }
  };
}