import React from 'react';
import classnames from 'classnames';

export default function TitleField({ id, title }) {
  const isRoot = id === 'root__title';

  const classes = classNames('schemaform-block-title', {
  	'schemaform-block-subtitle' : !isRoot
  });

  return <legend className={classes} id={id}>{title}</legend>;
}
