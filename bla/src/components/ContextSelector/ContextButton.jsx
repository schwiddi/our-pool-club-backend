import PropTypes from 'prop-types';
import React from 'react';

// TODO(herzog,arber) statless function?
// eslint-disable-next-line react/prefer-stateless-function
class ContextButton extends React.Component {
  static propTypes = {
    context: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    clickHandler: PropTypes.func,
  };

  static defaultProps = {
    selected: false,
    clickHandler: undefined,
  };

  render() {
    return (
      <button
        onClick={this.props.clickHandler}
        className={this.props.selected ? `btn active-ctx ${this.props.context}` : 'btn btn-default'}
      >
        {this.props.selected
          ? <b>{this.props.context.toUpperCase()}</b>
          : this.props.context}
      </button>
    );
  }
}

export default ContextButton;
