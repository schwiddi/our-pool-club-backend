import { connect } from 'react-redux';
import ActionsDropDown from '../../components/ProfilePanel/ActionsDropDown';
import { getUniqueActions } from '../../store/instances/selectors';

const mapStateToProps = (state, ownProps) => ({
  actions: getUniqueActions(state, ownProps.selectedInstanceIds),
});

export default connect(mapStateToProps)(ActionsDropDown);
