const React = require('react');
const UserStore = require('../../stores/UserStore');
const GroupStore = require('../../stores/GroupStore');
const ReactPropTypes = React.PropTypes;

const ENTER_KEY_CODE = 13;

const UserSelect = React.createClass({

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
    this.props.onSave(string, this.props.group);
    this.setState({
      value: '',
    });
  },

  /**
   * @param {object} event
   */
  _onChange(event) {
    const user = event.target.value;
    this.setState({
      value: user,
    });
    if (!user) {
      // Needed, apparently state won't update in time
      setTimeout(() => {
        this._save();
      }, 0);
    } else {
      GroupStore.addUser(this.props.group, {id: user, text: user});
      this.setState({
        value: '',
      });

    }
  },

  /**
   * @param  {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  },


  render() {
    const users = [];
    const all = UserStore.getAll();
    for (const key in all) {
      if (all.hasOwnProperty(key)) {
        users.push(<option key={'_option' + key} value={key}>{all[key].text}</option>);
      }
    }
    users.push(<option key={'new!' + this.props.group} value="">New</option>);
    return (
      <select
        style={{ 'outline': 'none', 'width': '50%', 'borderRadius': '8px', 'borderStyle': 'groove'}}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        group={this.props.group}
      >{users}
      </select>
    );
  },
});

module.exports = UserSelect;
