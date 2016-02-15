const MainSection = require('../MainSection');
const UserActions = require('../../actions/UserActions');
const UserInput = require('../UserInput');
const React = require('react');
const UserStore = require('../../stores/UserStore');

function getUserState() {
  return {
    allUsers: UserStore.getAll(),
    areAllComplete: UserStore.areAllComplete(),
  };
}

const MyApp = React.createClass({

  getInitialState() {
    return getUserState();
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  },

  /**
   * Event handler for 'change' events coming from the UserStore
   */
  _onChange() {
    this.setState(getUserState());
  },


  _onSave(text) {
    if (text.trim()) {
      UserActions.create(text);
    }
  },

  render() {
    return (
      <div>
        <MainSection
          allUsers={this.state.allUsers}
          areAllComplete={this.state.areAllComplete}
        />
        <UserInput
          id="new-user"
          placeholder="Username"
          onSave={this._onSave}
        />
      </div>
    );
  },

});

module.exports = MyApp;
