import { connect } from 'react-redux';
import CheckboxFilter from 'components/CheckboxFilter';
import { filterNode } from 'store/nodes/actions';

const mapDispatchToProps = dispatch => ({
  onChangeHandler: (e) => {
    dispatch(filterNode({ failedOnly: e.target.checked }));
  },
});

export default connect(null, mapDispatchToProps)(CheckboxFilter);
