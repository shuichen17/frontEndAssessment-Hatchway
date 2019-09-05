import React from 'react';
import Items from './Items.jsx';
class Searchres extends React.Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        
        if (this.props) {
            return (
                <div>
                    <div className="workerOrders-container">
                        {
                            this.props.workerOrders.map((ele, index) => 
                                
                                <Items orders={ele} key={index} workers={this.props.workerid[ele.workerId]}/>
                            ) 
                        }
                    </div>
    
                </div>
            )
        }
      
    }
}
export default Searchres;