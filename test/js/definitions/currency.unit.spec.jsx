import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';
import Form from '@department-of-veterans-affairs/react-jsonschema-form';

import { DefinitionTester } from '../../config/schemaform-utils.jsx';
import { currencyConfig } from '../../../src/js/definitions/currency';

describe('Schemaform definition currency', () => {
  it('should render currency', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={currencyConfig.schema()}
        uiSchema={currencyConfig.uiSchema()}/>
    );

    const formDOM = findDOMNode(form);

    const input = formDOM.querySelector('input');
    expect(input.type).to.equal('text');
  });
  it('should render invalid currency error', () => {
    const currencyUISchema = currencyConfig.uiSchema();
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={currencyConfig.schema()}
        uiSchema={currencyUISchema}/>
    );

    const formDOM = findDOMNode(form);
    const find = formDOM.querySelector.bind(formDOM);
    ReactTestUtils.Simulate.change(find('input'), {
      target: {
        value: 'asfd'
      }
    });
    ReactTestUtils.findRenderedComponentWithType(form, Form).onSubmit({
      preventDefault: f => f
    });

    expect(find('.usa-input-error-message').textContent).to.equal(`Error ${currencyUISchema['ui:errorMessages'].type}`);
  });
  it('should render currency title', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={currencyConfig.schema()}
        uiSchema={currencyConfig.uiSchema('My dollar amount')}/>
    );

    const formDOM = findDOMNode(form);

    expect(formDOM.querySelector('label').textContent).to.equal('My dollar amount');
  });
});
