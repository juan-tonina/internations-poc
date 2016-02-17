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
      <li style={{'margin': 'auto', 'width': '10%'}}
          className={classNames({ 'completed': user.complete, 'editing': this.state.isEditing, })}
          key={user.id}>
        <div className="view" style={{'textAlign': 'left'}}>
          <label onDoubleClick={this._onDoubleClick}>
            {user.text}
          </label>
          <button
            style={{'borderRadius': '10px', 'float': 'right', 'backgroundColor': 'red', 'height': '1em'}}
            onClick={this._onDestroyClick}/>
        </div>
        {input}
      </li>
    );
  },

});

module.exports = UserItem;
