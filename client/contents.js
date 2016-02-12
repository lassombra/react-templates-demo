contents = {
    Intro: {
        template: `<!-- name="intro-render" -->
<div class="row">
    <div class="col-xs-12">
        <h1>Welcome to Meteor!</h1>
        <button onClick="{this.click}">Click Me!</button>
        <p>You've clicked the button {this.state.clicks} times!</p>
    </div>
</div>`,
        jsx: `Intro = React.createClass({
    getInitialState() {
        return {clicks: 0};
    },
   render: introRender,
    click(event) {
        event.preventDefault();
        this.setState((current, props) => {
            current.clicks = current.clicks + 1;
            return current;
        })
    }
});`,
        compiled: `introRender = (function (React, _) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'row' }, React.createElement('div', { 'className': 'col-xs-12' }, React.createElement('h1', {}, 'Welcome to Meteor!'), React.createElement('button', { 'onClick': this.click }, 'Click Me!'), React.createElement('p', {}, 'You\'ve clicked the button ', this.state.clicks, ' times!')));
    };
})(React, _);`
    },
    ToDo: {
        template: `<!-- name="todo-render" -->
<div class="row">
    <div class="col-xs-12">
        <header>
            <h1>Todo List</h1>
            <h3>Uses rt-repeat and Meteor data mixin</h3>
        </header>
        <form onSubmit={this.newTask} class="form-inline">
            <div class="input-group">
                <input class="form-control" placeholder="new task" type="text" ref="textInput">
                <a class="input-group-addon" href="#" onClick={this.newTask}><i class="fa fa-plus"></i></a>
            </div>
        </form>
        <ul class="list-group">
            <!-- Effectively Task for each task in this.getTasks() -->
            <Task rt-repeat="task in this.data.tasks" key="{task._id}" task="{task}" clear="{this.remove}"/>
        </ul>
    </div>
</div>`,
        jsx:`var collection = new Meteor.Collection(null);
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
});`,
        compiled: `todoRender = (function (React, _) {
    'use strict';
    function repeatTask1(task, taskIndex) {
        return React.createElement(Task, {
            'key': task._id,
            'task': task,
            'clear': this.remove
        });
    }
    return function () {
        return React.createElement('div', { 'className': 'row' }, React.createElement('div', { 'className': 'col-xs-12' }, React.createElement('header', {}, React.createElement('h1', {}, 'Todo List'), React.createElement('h3', {}, 'Uses rt-repeat and Meteor data mixin')), React.createElement('form', {
            'onSubmit': this.newTask,
            'className': 'form-inline'
        }, React.createElement('div', { 'className': 'input-group' }, React.createElement('input', {
            'className': 'form-control',
            'placeholder': 'new task',
            'type': 'text',
            'ref': 'textInput'
        }), React.createElement('a', {
            'className': 'input-group-addon',
            'href': '#',
            'onClick': this.newTask
        }, React.createElement('i', { 'className': 'fa fa-plus' })))), React.createElement.apply(this, [
            'ul',
            { 'className': 'list-group' }    /*  Effectively Task for each task in this.getTasks()  */,
            _.map(this.data.tasks, repeatTask1.bind(this))
        ])));
    };
})(React, _);`
    }
};