/**
 * Created by Juan on 15/02/2016.
 */
const React = require('react');
const ReactPropTypes = React.PropTypes;

const ENTER_KEY_CODE = 13;

const UserInput = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string,
    group: ReactPropTypes.string,
  },

  getInitialState() {
    return {
      value: this.props.value || '',
      group: this.props.group,
    };
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    this.props.onSave(this.state.value, this.props.group);
    this.setState({
      value: '',
    });
  },

  /**
   * @param {object} event
   */
  _onChange(event) {
    this.setState({
      value: event.target.value,
    });
  },

  /**
   * @param  {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  },


  /**
   * This is going to create the user on blur. There is currently no way of cancelling the creation, I should have
   * added a button.
   * @return {object}
   */
  render() {
    return (
      <input
        style={{ 'outline': 'none', 'width': '50%', 'borderRadius': '8px', 'borderStyle': 'groove'}}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        group={this.props.group}
        autoFocus={true}
      />
    );
  },
});

module.exports = UserInput;
