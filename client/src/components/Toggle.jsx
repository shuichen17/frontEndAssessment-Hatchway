
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
        }
        this.handleCheckClick= this.handleCheckClick.bind(this);
    }

handleCheckClick() {
   
  this.setState({
      isToggleOn: !this.state.isToggleOn,
  });
  this.props.onToggle(this.state.isToggleOn);
}


    render() {
        return (
            <label className="switch">
                <input type="checkbox" value={this.state.isToggleOn} onClick={this.handleCheckClick} />
                <div className="slider"></div>
            </label>
        )
    }
}

export default Toggle;