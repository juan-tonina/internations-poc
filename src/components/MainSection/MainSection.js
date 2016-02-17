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
  _onSave(text, group) {
    if (text.trim()) {
      UserActions.create(text, group);
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
      return ( // I know, inline styles are a bad practice, but I didn't want to lose time with this :)
        <section style={{'minHeight': '500px'}}>
          <GroupInput id="new-group"
                      placeholder="Create group" onSave={this._onSaveGroup}/>
        </section>);
    }

    const groupStore = this.props.groupStore;
    const users = [];

    const all = groupStore.getAll();
    /**
     * This is going to iterate through groups and users. I don't really like to iterate using for..in,
     * but here it seemed cleaner. The whole block is messy, though.
     */
    for (const group in all) {
      if (all.hasOwnProperty(group)) {
        users.push(<li key={group} style={{'listStyle': 'none'}}>{'->' + all[group].text}</li>);
        byGroup = groupStore.getByGroup(group);
        for (const key in byGroup.users) {
          if (byGroup.users.hasOwnProperty(key)) {
            users.push(<UserItem key={key + group} user={byGroup.users[key]}/>);
          }
        }
        users.push(<UserInput key={'_' + group} group={group} id="new-user" placeholder="Username"
                              onSave={this._onSave}/>);
      }
    }

    return (
      // I know, inline styles are a really bad practice, but I didn't want to lose time with this :)
      <section id="main">
        <ul style={{'listStyle': '', 'left': '34%', 'position': 'relative'}}
            id="user-list">{users}</ul>
        <GroupInput id="new-group"
                    placeholder="Create group" onSave={this._onSaveGroup}/>
      </section>
    );
  },
});

module.exports = MainSection;
