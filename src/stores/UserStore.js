const AppDispatcher = require('../../src/core/Dispatcher');
const EventEmitter = require('events').EventEmitter;
const UserConstants = require('../constants/UserConstants');
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

const _users = {};

/**
 * Create a User.
 * @param  {string} text The username of the User
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _users[id] = {
    id: id,
    complete: false,
    text: text,
  };
}

/**
 * Update a User.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _users[id] = assign({}, _users[id], updates);
}

/**
 * Update all of the Users with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (const id in _users) {
    if (_users.hasOwnProperty(id)) {
      update(id, updates);
    }
  }
}

/**
 * Delete a User.
 * @param  {string} id
 */
function destroy(id) {
  delete _users[id];
}

/**
 * Delete all the completed Users.
 */
function destroyCompleted() {
  for (const id in _users) {
    if (_users.hasOwnProperty(id)) {
      if (_users[id].complete) {
        destroy(id);
      }
    }
  }
}

const UserStore = assign({}, EventEmitter.prototype, {

  areAllComplete() {
    for (const id in _users) {
      if (_users.hasOwnProperty(id)) {
        if (!_users[id].complete) {
          return false;
        }
      }
    }
    return true;
  },

  /**
   * Get the entire collection of Users.
   * @return {object}
   */
  getAll() {
    return _users;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

// Register callback to handle all updates
AppDispatcher.register((action) => {
  let text;

  switch (action.actionType) {
  case UserConstants.USER_CREATE:
    text = action.text.trim();
    if (text !== '') {
      create(text);
      UserStore.emitChange();
    }
    break;

  case UserConstants.USER_TOGGLE_COMPLETE_ALL:
    if (UserStore.areAllComplete()) {
      updateAll({complete: false});
    } else {
      updateAll({complete: true});
    }
    UserStore.emitChange();
    break;

  case UserConstants.USER_UNDO_COMPLETE:
    update(action.id, {complete: false});
    UserStore.emitChange();
    break;

  case UserConstants.USER_COMPLETE:
    update(action.id, {complete: true});
    UserStore.emitChange();
    break;

  case UserConstants.USER_UPDATE_TEXT:
    text = action.text.trim();
    if (text !== '') {
      update(action.id, {text: text});
      UserStore.emitChange();
    }
    break;

  case UserConstants.USER_DESTROY:
    destroy(action.id);
    UserStore.emitChange();
    break;

  case UserConstants.USER_DESTROY_COMPLETED:
    destroyCompleted();
    UserStore.emitChange();
    break;

  default:
    // no op
  }
});

module.exports = UserStore;
