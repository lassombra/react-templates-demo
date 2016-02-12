CodeShow = class CodeShow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {tab: 'working'};
    }
    template() {
        return contents[this.props.component].template;
    }
    jsx() {
        return contents[this.props.component].jsx;
    }
    compiled() {
        return contents[this.props.component].compiled;
    }
    class (tab) {
        return this.state.tab === tab ? 'active' : '';
    }
    select(tab) {
        this.setState(() => {return {tab};});
        return false;
    }
    componentDidMount() {
        hljs.highlightBlock(this.refs.template);
        hljs.highlightBlock(this.refs.compiled);
        hljs.highlightBlock(this.refs.jsx);
    }
    render() {return codeRender.call(this);}
};