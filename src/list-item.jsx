var React = require('react');
var rootUrl = 'https://popping-torch-6383.firebaseio.com/';

module.exports = React.createClass({
    getInitialState: function() {
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false
        }
    },
    componentWillMount: function() {
        this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key); // Points to the particular ID of list item in this component
    },
    render: function() {
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <input
                        type="checkbox"
                        onChange={this.handleDoneChange}
                        checked={this.state.done}
                    />
                </span>
                <input type="text"
                    className="form-control"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    disabled={this.state.done}
                />
                <span className="input-group-btn">
                    {this.changesButtons()}
                    <button
                        className="btn btn-default"
                        onClick={this.handleDeleteClick}
                    >
                        Delete
                    </button>
                </span>
            </div>
        )
    },
    changesButtons: function () {
        if(!this.state.textChanged) {
            return null;
        } else {
            return [
                <button
                    className="btn btn-default"
                    onClick={this.handleSaveClick}
                    >
                        Save
                    </button>,

                <button
                    className="btn btn-default"
                    onClick={this.handleUndoClick}
                >
                    Undo
                </button>
            ]
        }
    },
    handleUndoClick: function () {
        this.setState({
            text: this.props.item.text,
            textChanged: false
        })
    },
    handleSaveClick: function (event) {
        this.fb.update({
            text: this.state.text
        });
        this.setState({
            textChanged: false
        })
    },
    handleDoneChange: function (event) {
        var update = {done: event.target.checked};
        this.setState(update);
        this.fb.update(update); 
    },
    handleDeleteClick: function () {
        this.fb.remove();
    },
    handleTextChange: function (event) {
        this.setState({
            text: event.target.value,
            textChanged: true
        })
    }
});
