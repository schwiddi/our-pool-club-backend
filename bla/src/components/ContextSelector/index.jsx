import PropTypes from 'prop-types';
import React from 'react';
import ContextButton from './ContextButton';

const chunksize = 5;

// splits array to array of arrays with length of chunksize
const split = (contexts) => {
  const splitted = [];
  let i;
  let j;
  for ((i = 0), (j = contexts.length); i < j; i += chunksize) {
    splitted.push(contexts.slice(i, i + chunksize));
  }
  return splitted;
};

class ContextSelector extends React.Component {
  static propTypes = {
    contexts: PropTypes.arrayOf(PropTypes.string).isRequired,
    clickHandler: PropTypes.func.isRequired,
    selectedContext: PropTypes.string.isRequired,
  };

  state = {
    selected: this.props.selectedContext,
  };

  handleClick = (ctx) => {
    this.props.clickHandler(ctx);
    this.setState(() => ({
      selected: ctx,
    }));
  }

  render() {
    return (
      <div className="contextrow">
        {split(this.props.contexts).map(context => (
          <div key={context.join('-')} className="row">
            <div className="btn-group" role="group" aria-label="...">
              {context.map(ctx => (
                <ContextButton
                  clickHandler={() => this.handleClick(ctx)}
                  key={ctx}
                  context={ctx}
                  selected={this.state.selected === ctx}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ContextSelector;
