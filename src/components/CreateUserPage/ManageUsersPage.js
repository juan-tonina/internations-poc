const MainSection = require('../MainSection');
const React = require('react');
const UserStore = require('../../stores/UserStore');
const GroupStore = require('../../stores/GroupStore');

function getUserState() {
  return {
    allUsers: UserStore.getAll(),
    groupStore: GroupStore,
  };
}

const MyApp = React.createClass({

  getInitialState() {
    return getUserState();
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    GroupStore.addChangeListener(this._onChangeGroup);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    GroupStore.removeChangeListener(this._onChangeGroup);
  },

  /**
   * Event handler for 'change' events coming from the UserStore
   */
  _onChange() {
    this.setState(getUserState());
  },
  _onChangeGroup() {
    this.setState(getUserState());
  },


  render() {
    return (
      <div>
        <MainSection
          allUsers={this.state.allUsers}
          groupStore={this.state.groupStore}
        />

      </div>
    );
  },

});

module.exports = MyApp;
