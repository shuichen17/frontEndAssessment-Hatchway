import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Promise } from 'bluebird';
import Workers from './components/Workers.jsx';
import Search from './components/Search.jsx';
import Searchres from './components/Searchres.jsx';

import './style.css';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            work_ordersAscend: null,
            work_ordersDescend: null,
            work_Id: null,
            searched: null,
            isChecked: false
        }
        this.ordersList = this.ordersList.bind(this);
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.ordersList();
    }
  
    async ordersList() {
        try {
            var workers = [];
            var nums = [];
            var workerId = [];
            var apiURL = "https://www.hatchways.io/api/assessment/work_orders";
            var fetchData = axios.get(apiURL);

            var dataBrick = await Promise.all([fetchData]);
            //console.log('arr', dataBrick[0].data.orders) 
            dataBrick[0].data.orders.map((ele) => {
                if (!nums.includes(ele.workerId)) {
                    nums.push(ele.workerId);
                    workers.push(axios.get(`https://www.hatchways.io/api/assessment/workers/${ele.workerId}`));
                }
            });
            workers = await Promise.all(workers);
            workers.forEach(x => {
                let index = x.data.worker.id;
                workerId[index] = x.data.worker;
            });
            var ascend = dataBrick[0].data.orders.sort((a, b) => a.deadline - b.deadline).slice();
            var descend = dataBrick[0].data.orders.sort((a, b) => b.deadline - a.deadline);

            this.setState({
                work_ordersAscend: ascend,
                work_ordersDescend: descend,
                work_Id: workerId
            })
            
        } catch (err) {
            console.log(err);
        }
    }
    search(value) {
        let orderId;
        let res = [];
        let arr = [];
        for (let i = 0; i < this.state.work_Id.length; i++) {
            let cur = this.state.work_Id[i];
            if (cur.name.toLowerCase() === value.toLowerCase()) {
                orderId = cur.id;
                break;
            }
        }
        if (this.state.isChecked) {
            arr = this.state.work_ordersDescend;
        } else {
            arr = this.state.work_ordersAscend;
        }
        for (let i = 0; i < arr.length; i++) {
            let cur = arr[i];
            if (orderId === cur.workerId) {
                res.push(cur);
            }
        }
        this.setState({ searched: res });
    }
    handleChange() {
        this.setState({isChecked: !this.state.isChecked})
    }
    

    render() {
        //console.log('states', 'id', this.state.work_orders, this.state.work_Id)
        let control;
        
        if (!this.state.searched) {
            if (!this.state.isChecked) {

                control = <Workers workerOrders={this.state.work_ordersAscend} workerid={this.state.work_Id} />
            } else {
                control = <Workers workerOrders={this.state.work_ordersDescend} workerid={this.state.work_Id} />  
            }
            
        } else {

            control = <Searchres workerOrders={this.state.searched} workerid={this.state.work_Id} />
        }
        return (
            <div>
                <Search onSearch={this.search} />
                <label className="switch">
                <input type="checkbox" value={this.state.isChecked} onChange={this.handleChange} />
                <div className="slider"></div>
            </label>
                {control}
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('app'));