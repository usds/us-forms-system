import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';
import Form from '@department-of-veterans-affairs/react-jsonschema-form';

import { DefinitionTester } from '../../config/schemaform-utils.jsx';
import { dateRangeConfig } from '../../../src/js/definitions/dateRange';
import { dateConfig } from '../../../src/js/definitions/date';

function fillDate(find, toFrom, day, month, year) {
  const dayNode = find(`#root_${toFrom}Day`);
  dayNode.value = day;
  ReactTestUtils.Simulate.change(dayNode);
  const monthNode = find(`#root_${toFrom}Month`);
  monthNode.value = month;
  ReactTestUtils.Simulate.change(monthNode);
  const yearNode = find(`#root_${toFrom}Year`);
  yearNode.value = year;
  ReactTestUtils.Simulate.change(yearNode);
}

describe('Schemaform definition dateRange', () => {
  it('should render dateRange', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={dateRangeConfig.schema()}
        definitions={dateConfig.schema()}
        uiSchema={dateRangeConfig.uiSchema()}/>
    );

    const formDOM = findDOMNode(form);

    expect(formDOM.querySelectorAll('label,legend').length).to.equal(8);
    expect(formDOM.querySelectorAll('input').length).to.equal(2);
    expect(formDOM.querySelectorAll('select').length).to.equal(4);
  });
  it('should render invalid dateRange error', () => {
    const dateRangeUISchema = dateRangeConfig.uiSchema();
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={dateRangeConfig.schema()}
        definitions={dateConfig.schema()}
        uiSchema={dateRangeUISchema}/>
    );

    const formDOM = findDOMNode(form);
    const find = formDOM.querySelector.bind(formDOM);
    fillDate(find, 'from', 5, 5, 2001);
    fillDate(find, 'to', 4, 4, 2000);

    ReactTestUtils.findRenderedComponentWithType(form, Form).onSubmit({
      preventDefault: f => f
    });

    expect(find('.usa-input-error-message').textContent).to.equal(`Error ${dateRangeUISchema['ui:errorMessages'].pattern}`);
  });
  it('should allow a single-date range', () => {
    const dateRangeUISchema = dateRangeConfig.uiSchema();
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={dateRangeConfig.schema()}
        definitions={dateConfig.schema()}
        uiSchema={dateRangeUISchema}/>
    );

    const formDOM = findDOMNode(form);
    const find = formDOM.querySelector.bind(formDOM);
    fillDate(find, 'from', 11, 11, 1999);
    fillDate(find, 'to', 11, 11, 1999);

    ReactTestUtils.findRenderedComponentWithType(form, Form).onSubmit({
      preventDefault: f => f
    });

    expect(find('.usa-input-error-message')).to.be.null;
  });
  it('should render dateRange title and messages', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={dateRangeConfig.schema()}
        definitions={dateConfig.schema()}
        uiSchema={dateRangeConfig.uiSchema('My from date', 'My to date', 'My error')}/>
    );

    const formDOM = findDOMNode(form);

    expect(formDOM.querySelectorAll('legend')[0].textContent).to.equal('My from date');
    expect(formDOM.querySelectorAll('legend')[1].textContent).to.equal('My to date');
  });
});
