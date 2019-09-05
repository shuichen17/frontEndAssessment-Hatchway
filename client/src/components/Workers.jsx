import React from 'react';
import Items from './Items.jsx';
class Workers extends React.Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        console.log('workers', this.props)
        return (
            <div>
                <div className="workerOrders-container">
                    {this.props.workerOrders && this.props.workerid ?
                        this.props.workerOrders.map((ele, index) => 
                            
                            <Items orders={ele} key={index} workers={this.props.workerid[ele.workerId]}/>
                        ) :
                        <p>Loading...</p>
                    }
                </div>

            </div>
        )
    }
}

export default Workers;