import React from 'react';
class Search extends React.Component {
    constructor(props) {
        super(props);
        //console.log('props', props)
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state.value);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} 
                onChange={this.handleChange} placeholder="Filter by worker name..."/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
export default Search;