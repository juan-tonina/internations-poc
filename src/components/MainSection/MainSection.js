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
        <section style={{'minHeight': '500px', 'marginTop': '5%', 'textAlign': 'center'}}>
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
     *
     * Oh! and I know that if you are an admin this list cannot possibly be empty, ever. But part of the pdf with
     * the use cases stated that "a user cannot exist without having at least one group", so I assumed that the admin
     * didn't count as a group/user.
     */
    for (const group in all) {
      if (all.hasOwnProperty(group)) {
        // I wanted this to be collapsible, but I didn't have the time to actually do it.
        users.push(<li key={group}
                       style={{'listStyle': 'none', 'fontWeight': 'bold', 'fontSize': 'larger', 'margin': 'auto',
                        'width': '50%'}}>{all[group].text}</li>);
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
    /**
     * I know, inline styles are a really bad practice, but I didn't want to lose time with this :) the @WithStyles
     * annotation only works with new classes, not React.createClass...
     */
      <section id="main" style={{'marginTop': '5%', 'textAlign': 'center'}}>
        <ul id="user-list" style={{'padding': '0'}}>{users}</ul>
        <GroupInput id="new-group"
                    placeholder="Create group" onSave={this._onSaveGroup}/>
      </section>
    );
  },
});

module.exports = MainSection;
