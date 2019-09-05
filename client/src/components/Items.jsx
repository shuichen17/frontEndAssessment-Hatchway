import React from 'react';
var Items = (props) => {

  return (
    <div className="item">
      <div><h1>{props.orders.name}</h1><p>{props.orders.description}</p>
        <div className="info-container"><img src={props.workers.image} />
          <div className="info"><p>name: {props.workers.name}</p><p>company: {props.workers.companyName}</p><p>email: {props.workers.email}</p>
          </div>
        </div>
        <div className="time">{new Date(props.orders.deadline * 1000).toString().slice(0, 24)}</div>
      </div>
    </div>
  )
}
export default Items;