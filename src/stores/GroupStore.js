const AppDispatcher = require('../../src/core/Dispatcher');
const EventEmitter = require('events').EventEmitter;
const GroupConstants = require('../constants/GroupConstants');
const assign = require('object-assign');
const _ = require('lodash');

const CHANGE_EVENT = 'change';

const _groups = {};

/**
 * Create a Group.
 * @param  {string} text The name of the Group
 */
function create(text) {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _groups[id] = {
    id: id,
    users: [],
    text: text,
  };
}

/**
 * Update a Group.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _groups[id] = assign({}, _groups[id], updates);
}

/**
 * Update all of the Groups with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (const id in _groups) {
    if (_groups.hasOwnProperty(id)) {
      update(id, updates);
    }
  }
}

/**
 * Delete a Group.
 * @param  {string} id
 */
function destroy(id) {
  if (!_groups[id].users.length) {
    delete _groups[id];
  }
}

const GroupStore = assign({}, EventEmitter.prototype, {

  addUser(group, user) {
    _groups[group].users.push(user);
  },

  extracted(group, id) {
    _.remove(_groups[group].users, (user) => user.id === id);
  },
  deleteFromGroups(id) {
    for (const group in _groups) {
      if (_groups.hasOwnProperty(group)) {
        this.extracted(group, id);
      }
    }
  },

  /**
   * Get the entire collection of Groups.
   * @return {object}
   */
  getAll() {
    return _groups;
  },

  getByGroup(groupId) {
    return _groups[groupId];
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
    case GroupConstants.GROUP_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        GroupStore.emitChange();
      }
      break;

    case GroupConstants.GROUP_TOGGLE_COMPLETE_ALL:
      if (GroupStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_UNDO_COMPLETE:
      update(action.id, {complete: false});
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_COMPLETE:
      update(action.id, {complete: true});
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        GroupStore.emitChange();
      }
      break;

    case GroupConstants.GROUP_DESTROY:
      destroy(action.id);
      GroupStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = GroupStore;
