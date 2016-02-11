var collection = new Meteor.Collection(null);
collection.insert({text: 'This is task 1'});
collection.insert({text: 'This is task 2'});
collection.insert({text: 'This is task 3'});
ToDo = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            tasks: collection.find({}).fetch()
        };
    },
    remove(_id) {
        collection.remove({_id});
    },
    add(text) {
        collection.insert({text});
    },
    newTask(event) {
        event.preventDefault();
        let text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        this.add(text);
        ReactDOM.findDOMNode(this.refs.textInput).value = "";
    },

    render: todoRender
});