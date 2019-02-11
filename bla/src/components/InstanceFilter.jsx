import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, FormControl, Checkbox } from 'react-bootstrap';

const InstanceFilter = ({
  filter,
  handleIDFilter,
  handleFailFilter,
  handleOverrideFilter,
}) => (
  <Row>
    <Col xsOffset={0} xs={3}>
      <FormControl
        type="text"
        placeholder="Filter Instances"
        onChange={handleIDFilter}
        value={filter.id}
      />
    </Col>
    <Col xs={1}>
      <form>
        <Checkbox checked={filter.failed} onChange={handleFailFilter} >
          Failed
        </Checkbox>
      </form>
    </Col>
    <Col xs={1}>
      <form>
        <Checkbox checked={filter.overridden} onChange={handleOverrideFilter} >
          Overridden
        </Checkbox>
      </form>
    </Col>
  </Row>
);

InstanceFilter.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string,
    overridden: PropTypes.bool,
    failed: PropTypes.bool,
  }),
  handleIDFilter: PropTypes.func.isRequired,
  handleFailFilter: PropTypes.func.isRequired,
  handleOverrideFilter: PropTypes.func.isRequired,
};

InstanceFilter.defaultProps = {
  filter: {
    id: '',
    overridden: false,
    failed: false,
  },
};

export default InstanceFilter;
