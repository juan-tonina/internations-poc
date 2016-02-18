/**
 * Created by Juan on 15/02/2016.
 */
const React = require('react');
const ReactPropTypes = React.PropTypes;
const GroupActions = require('../../actions/GroupActions');

const GroupItem = React.createClass({

  propTypes: {
    group: ReactPropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      isEditing: false,
    };
  },

  _onDoubleClick() {
    this.setState({isEditing: true});
  },

  _onSave(text) {
    GroupActions.updateText(this.props.group.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick() {
    GroupActions.destroy(this.props.group);
  },

  /**
   * @return {object}
   */
  render() {
    // I know, I know, inline styles...
    return (
      <button
        style={{'borderRadius': '10px', 'float': 'right', 'backgroundColor': 'red', 'height': '1em'}}
        onClick={this._onDestroyClick}/>
    );
  },

});

module.exports = GroupItem;
