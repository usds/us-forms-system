import React from 'react';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';

import DescriptionField from '../../../src/js/fields/DescriptionField';

describe('Schemaform <DescriptionField>', () => {
  it('should render description text', () => {
    const tree = SkinDeep.shallowRender(
      <DescriptionField description="description"/>
    );

    expect(tree.text()).to.equal('description');
  });
  it('should render description element', () => {
  const GetDescription = () => (<p>description</p>);
    const tree = SkinDeep.shallowRender(
      <DescriptionField description={GetDescription}/>
    );

    expect(tree.dive(['GetDescription']).text()).to.equal('description');
  });
  it('should render with optional props', () => {
    const GetDescription = ({formData}) => (<p>{formData.name}</p>);
    const formData = {name: 'abc'};
    const tree = SkinDeep.shallowRender(
      <DescriptionField description={GetDescription} formData={formData}/>
    );

    expect(tree.dive(['GetDescription']).text()).to.equal('abc');
  }); 
});
