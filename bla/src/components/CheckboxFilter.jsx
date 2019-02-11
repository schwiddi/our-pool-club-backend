import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const CheckboxFilter = ({
  name = 'Failed only',
  onChangeHandler,
}) => (
  <Checkbox onChange={onChangeHandler}>
    {name}
  </Checkbox>
);


CheckboxFilter.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default CheckboxFilter;
