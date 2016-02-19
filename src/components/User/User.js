/**
 * Created by Juan on 15/02/2016.
 */
const React = require('react');
const ReactPropTypes = React.PropTypes;
const UserActions = require('../../actions/UserActions');
const UserTextInput = require('../UserInput/UserInput');

const classNames = require('classnames');

const UserItem = React.createClass({

  propTypes: {
    user: ReactPropTypes.object.isRequired,
    group: ReactPropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      isEditing: false,
    };
  },

  _onDoubleClick() {
    this.setState({isEditing: true});
  },

  _onSave(text) {
    UserActions.updateText(this.props.user.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick() {
    UserActions.destroy(this.props.user.id);
  },

  /**
   * This should be a groupAction, actually
   * @private
   */
  _onRemoveClick() {
    UserActions.removeUser(this.props.user.id, this.props.group);
  },

  /**
   * @return {object}
   */
  render() {
    const user = this.props.user;

    let input;
    if (this.state.isEditing) {
      input =
        (<UserTextInput
          className="edit"
          onSave={this._onSave}
          value={user.text}
        />);
    }

    // I know, I know, inline styles...
    return (
      <li className="user-item"
          key={user.id}>
        <div className="view" style={{'textAlign': 'left'}}>
          <label>
            {user.text}
          </label>
          <button
            className="remove-button-user"
            onClick={this._onRemoveClick}>Remove
          </button>
          <button
            className="delete-button-user"
            onClick={this._onDestroyClick}>Delete
          </button>
        </div>
        {input}
      </li>
    );
  },

});

module.exports = UserItem;
