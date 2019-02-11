import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const TextFilter = ({ placeholder = 'Filter entries', onChangeHandler }) => (
  <FormControl
    type="text"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

TextFilter.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

TextFilter.defaultProps = {
  placeholder: 'Filter entries',
};

export default TextFilter;
