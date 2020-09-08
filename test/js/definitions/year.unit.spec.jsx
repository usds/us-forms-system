import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';
import Form from '@department-of-veterans-affairs/react-jsonschema-form';

import { DefinitionTester } from '../../config/schemaform-utils.jsx';
import { yearConfig } from '../../../src/js/definitions/year';

describe('Schemaform definition year', () => {
  it('should render year and title', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={yearConfig.schema()}
        uiSchema={yearConfig.uiSchema('Year of Birth')}/>
    );

    const formDOM = findDOMNode(form);
    expect(formDOM.querySelector('input').type).to.equal('number');
    expect(formDOM.querySelector('label').textContent).to.equal('Year of Birth');
    expect(formDOM.querySelector('.usa-error-message')).to.equal(null);
  });
  it('should give errors on invalid years', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={yearConfig.schema()}
        uiSchema={yearConfig.uiSchema()}/>
    );

    const formDOM = findDOMNode(form);
    const errorMsg = () => formDOM.querySelector('.usa-error-message');
    const setYear = y => {
      ReactTestUtils.Simulate.change(formDOM.querySelector('input'), { target: { value: y } });
      ReactTestUtils.findRenderedComponentWithType(form, Form).onSubmit({
        preventDefault: f => f
      });
    };
    expect(errorMsg()).to.equal(null);
    setYear('asdf');
    expect(errorMsg()).to.not.equal(null);
    setYear('2020');
    expect(errorMsg()).to.equal(null);
    setYear('6025');
    expect(errorMsg()).to.not.equal(null);
    setYear('1953');
    expect(errorMsg()).to.equal(null);
  });
});
