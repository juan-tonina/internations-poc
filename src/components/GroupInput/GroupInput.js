/**
 * Created by Juan on 15/02/2016.
 */
const React = require('react');
const ReactPropTypes = React.PropTypes;

const ENTER_KEY_CODE = 13;

const GroupInput = React.createClass({

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
    const value = this.state.value;
    const string = value.charAt(0).toUpperCase() + value.slice(1);
    this.props.onSave(string, this.state.group);
    this.setState({
      value: '',
      group: this.state.group,
    });
  },

  /**
   * @param {object} event
   */
  _onChange(event) {
    this.setState({
      value: event.target.value,
      group: event.target.group,
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
   * This is going to create the group on blur. There is currently no way of cancelling the creation, I should have
   * added a button (but this being a proof of concept, it seemed unnecessary
   * @return {object}
   */
  render() {
    return (

      <input
        className="group-input"
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  },
});

module.exports = GroupInput;
