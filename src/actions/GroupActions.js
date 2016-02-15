const AppDispatcher = require('../../src/core/Dispatcher');
const GroupConstants = require('../constants/GroupConstants');

const GroupActions = {

  /**
   * @param  {string} text
   */
  create(text) {
    AppDispatcher.dispatch({
      actionType: GroupConstants.GROUP_CREATE,
      text: text,
    });
  },

  /**
   * @param id
   * @param text
   */
  updateText(id, text) {
    AppDispatcher.dispatch({
      actionType: GroupConstants.GROUP_UPDATE_TEXT,
      id: id,
      text: text,
    });
  },

  /**
   * @param group
   */
  toggleComplete(group) {
    const id = group.id;
    const actionType = group.complete ?
      GroupConstants.GROUP_UNDO_COMPLETE :
      GroupConstants.GROUP_COMPLETE;

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
      actionType: GroupConstants.GROUP_TOGGLE_COMPLETE_ALL,
    });
  },

  /**
   * @param  {string} id
   */
  destroy(id) {
    AppDispatcher.dispatch({
      actionType: GroupConstants.GROUP_DESTROY,
      id: id,
    });
  },

};

module.exports = GroupActions;
