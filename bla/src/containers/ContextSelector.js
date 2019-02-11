import { connect } from 'react-redux';

import ContextSelector from 'components/ContextSelector';
import { reloadActiveInstances } from 'store/instances/actions';
import { getAllContexts } from 'store/profiles/selectors';
import { getSelectedContext } from 'store/instances/selectors';

const mapStateToProps = state => ({
  contexts: getAllContexts(state),
  selectedContext: getSelectedContext(state).context,
});

const mapDispatchToProps = dispatch => ({
  clickHandler: (ctx) => {
    dispatch(reloadActiveInstances({ context: ctx }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContextSelector);
