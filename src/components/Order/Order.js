import React from 'react';
import classes from './Order.css';
const Order = (props) => {
  const { ingredients, price, orderData } = props.order;
  let ingString = '';
  for (let keys in ingredients)
  {
    ingString += `${keys}(${ingredients[keys]}), `;
  }
  return (
    <div className={classes.Order}>
      <p>
        Ingredients : {ingString}
      </p>
      <p>
        Price : {price}
      </p>
      <p>
        Name : {orderData.name}
      </p>
      <p>
        Email : {orderData.email}
      </p>
      <p>
        Address : {orderData.street} - {orderData.country}
      </p>
      <p>
        ZipCode : {orderData.zipCode}
      </p>
      <p>
        Delivery Method : {orderData.deliveryMethod}
      </p>
    </div>
  )
}

export default Order;