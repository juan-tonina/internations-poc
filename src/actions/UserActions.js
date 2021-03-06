const AppDispatcher = require('../../src/core/Dispatcher');
const UserConstants = require('../constants/UserConstants');

const UserActions = {

  /**
   * @param  {string} text
   * @param group
   */
  create(text, group) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_CREATE,
      text,
      group,
    });
  },

  /**
   * @param id
   * @param text
   */
  updateText(id, text) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_UPDATE_TEXT,
      id: id,
      text: text,
    });
  },

  /**
   *
   * @param user
   * @param group
   */
  removeUser(user, group) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REMOVE,
      user: user,
      group: group,
    });
  },

  /**
   * @param user
   */
  toggleComplete(user) {
    const id = user.id;
    const actionType = user.complete ?
      UserConstants.USER_UNDO_COMPLETE :
      UserConstants.USER_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id,
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll() {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_TOGGLE_COMPLETE_ALL,
    });
  },

  /**
   * @param  {string} id
   */
  destroy(id) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_DESTROY,
      id: id,
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted() {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_DESTROY_COMPLETED,
    });
  },

};

module.exports = UserActions;
