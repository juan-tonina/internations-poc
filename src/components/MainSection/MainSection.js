const React = require('react');
const ReactPropTypes = React.PropTypes;
const UserActions = require('../../actions/UserActions');
const GroupActions = require('../../actions/GroupActions');
const UserItem = require('../User/User');
const UserInput = require('../UserInput/UserInput');
const GroupInput = require('../GroupInput/GroupInput');

const MainSection = React.createClass({

  propTypes: {
    groupStore: ReactPropTypes.object.isRequired,
  },

  _onToggleCompleteAll() {
    UserActions.toggleCompleteAll();
  },
  _onSave(text) {
    if (text.trim()) {
      UserActions.create(text);
    }
  },
  _onSaveGroup(text) {
    if (text.trim()) {
      GroupActions.create(text);
    }
  },

  /**
   * @return {object}
   */
  render() {
    let byGroup;
    if (Object.keys(this.props.groupStore.getAll()).length < 1) {
      return (<GroupInput id="new-group" placeholder="Create group" onSave={this._onSaveGroup}/>);
    }

    const groupStore = this.props.groupStore;
    const users = [];

    const all = groupStore.getAll();
    for (const group in all) {
      if (all.hasOwnProperty(group)) {
        users.push(<li>{all[group].text}</li>);
        byGroup = groupStore.getByGroup(group);
        for (const key in byGroup.users) {
          if (byGroup.hasOwnProperty(key)) {
            users.push(<UserItem key={key} user={byGroup[key]}/>);
          }
        }
        users.push(<UserInput group={group} id="new-user" placeholder="Username" onSave={this._onSave}/>);
      }
    }

    return (
      <section id="main">
        <ul id="user-list">{users}</ul>
      </section>
    );
  },
});

module.exports = MainSection;
