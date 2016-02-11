Intro = React.createClass({
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
});