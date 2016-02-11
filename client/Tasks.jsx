// Task component - represents a single todo item
Task = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: React.PropTypes.object.isRequired,
        clear: React.PropTypes.func
    },
    clear(event) {
        if (this.props.clear) {
            this.props.clear(this.props.task._id);
        }
        event.preventDefault();
        event.preventBubble();
    },
    render() {
        return (
            <a href="#" onClick={this.clear} className="list-group-item">{this.props.task.text}</a>
        );
    }
});