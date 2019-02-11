import React from 'react';
import PropTypes from 'prop-types';

const SelectFilter = (filterObject) => {
  const Filter = ({ filter, onChange }) => (
    <select
      onChange={event => onChange(event.target.value)}
      style={{ width: '100%' }}
      value={filter ? filter.value : 'All'}
    >
      {
        Object.keys(filterObject).map(key => (
          <option
            key={filterObject[key]}
            value={filterObject[key]}
          >
            {filterObject[key]}
          </option>
        ))
      }
    </select>
  );

  Filter.propTypes = {
    filter: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  return Filter;
};

export default SelectFilter;
