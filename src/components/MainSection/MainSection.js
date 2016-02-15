const React = require('react');
const ReactPropTypes = React.PropTypes;
const UserActions = require('../../actions/UserActions');
const UserItem = require('../User/User');

const MainSection = React.createClass({

  propTypes: {
    allUsers: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  _onToggleCompleteAll() {
    UserActions.toggleCompleteAll();
  },


  /**
   * @return {object}
   */
  render() {
    if (Object.keys(this.props.allUsers).length < 1) {
      return null;
    }

    const allUsers = this.props.allUsers;
    const users = [];

    for (const key in allUsers) {
      if (allUsers.hasOwnProperty(key)) {
        users.push(<UserItem key={key} user={allUsers[key]}/>);
      }
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="user-list">{users}</ul>
      </section>
    );
  },
});

module.exports = MainSection;
