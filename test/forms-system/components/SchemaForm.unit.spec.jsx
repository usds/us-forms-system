import React from 'react';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';

import SchemaForm from '../../../src/js/forms-system/components/SchemaForm';

describe('Schemaform <SchemaForm>', () => {
  it('should render', () => {
    const name = 'testPage';
    const schema = {};
    const uiSchema = {};
    const data = {};

    const tree = SkinDeep.shallowRender(
      <SchemaForm
        name={name}
        title={name}
        schema={schema}
        uiSchema={uiSchema}
        pageData={data}/>
    );

    expect(tree.everySubTree('Form')).not.to.be.empty;
  });
});
