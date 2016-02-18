const React = require('react');
const ReactPropTypes = React.PropTypes;
const UserActions = require('../../actions/UserActions');
const GroupActions = require('../../actions/GroupActions');
const UserItem = require('../User/User');
const UserInput = require('../UserInput/UserInput');
const UserSelect = require('../UserSelect/UserSelect');
const GroupInput = require('../GroupInput/GroupInput');
const GroupItem = require('../Group/Group');

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
        <section style={{
          'marginTop': '5%', 'marginLeft': 'auto', 'textAlign': 'center', 'width': '50%',
          'marginRight': 'auto', 'borderRadius': '16px', 'borderStyle': 'groove',
          'borderColor': '#373277', 'paddingBottom': '5%', 'paddingTop': '5%'
        }}>
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
        /**
         * I wanted this to be collapsible, but I didn't have the time to actually do it.
         *
         * Oh! and I know that this should be inside the component (pretty much like UserItem, but I'm tired
         * and its working.
         */
        users.push(<li key={group}
                       style={{'listStyle': 'none', 'fontWeight': 'bold', 'fontSize': 'larger', 'margin': 'auto',
                        'width': '50%'}}>{all[group].text}<GroupItem key={'item_' + group} group={group}/></li>);
        byGroup = groupStore.getByGroup(group);
        for (const key in byGroup.users) {
          if (byGroup.users.hasOwnProperty(key)) {
            users.push(<UserItem key={key + group} user={byGroup.users[key]} group={group}/>);
          }
        }
        users.push(<UserInput key={'_' + group} group={group} id="new-user" placeholder="Username"
                              onSave={this._onSave}/>);
        users.push(<UserSelect key={'select_' + group} group={group} id="new-user" placeholder="Username"
                               onSave={this._onSave}/>);
      }
    }

    return (
    /**
     * I know, inline styles are a really bad practice, but I didn't want to lose time with this :) the @WithStyles
     * annotation only works with new classes, not React.createClass...
     */
      <section id="main"
               style={{ 'marginTop': '5%', 'marginLeft': 'auto', 'textAlign': 'center', 'width': '50%',
                'marginRight': 'auto', 'borderRadius': '16px', 'borderStyle': 'groove',
                 'borderColor': '#373277', 'paddingBottom': '5%', 'paddingTop': '5%' }}>
        <ul id="user-list" style={{'padding': '0'}}>{users}</ul>
        <GroupInput id="new-group"
                    placeholder="Create group" onSave={this._onSaveGroup}/>
      </section>
    );
  },
});

module.exports = MainSection;
