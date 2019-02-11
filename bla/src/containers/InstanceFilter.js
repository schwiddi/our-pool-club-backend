import { connect } from 'react-redux';
import InstanceFilter from 'components/InstanceFilter';
import { getFilter } from 'store/instances/selectors';
import { updateFilter } from 'store/instances/actions';

const mapStateToProps = state => ({
  filter: getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  handleIDFilter: e => dispatch(updateFilter({ id: e.target.value })),
  handleFailFilter: e => dispatch(updateFilter({ failed: e.target.checked })),
  handleOverrideFilter: e => dispatch(updateFilter({ overridden: e.target.checked })),
});

export default connect(mapStateToProps, mapDispatchToProps)(InstanceFilter);
