import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  marginLeft: '1px',
  marginRight: '1px',
};

const getClass = (ctx) => {
  let className = 'label-default';
  if (ctx && ctx.length > 0 && ctx[0].toLowerCase() === 'p') {
    className = 'label-danger';
  }
  return `label ${className}`;
};

const ContextLabel = ({ contexts = [] }) => (
  <span>
    {contexts.map(ctx => (
      <span key={ctx} style={Object.assign({}, styles)} className={getClass(ctx)}>
        {ctx}
      </span>
    ))}
  </span>
);

ContextLabel.propTypes = {
  contexts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ContextLabel;
