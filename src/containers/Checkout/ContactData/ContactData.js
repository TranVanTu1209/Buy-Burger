import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { checkValidity } from '../../../share/utility';

class ContactData extends Component {
  _isMounted = false;
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name...'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your email...'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street...'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            },
            {
              value: 'normal',
              displayValue: 'Normal'
            },
          ]
        },
        value: 'fastest',
        validation: {
          required: false
        },
        valid: true,
        touched: true
      },
    },
    formIsValid: false
  }
 
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formIdentifier in this.state.orderForm)
    {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
  }
  inputChangeHandler = (e, identifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(e.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[identifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm)
    {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  }
  componentDidmount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm)
    {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {
          formElementsArray.map(el => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              changed={(e) => this.inputChangeHandler(e, el.id)}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              invalid={!el.config.valid}
            />
          ))
        }
        <Button
          disabled={!this.state.formIsValid}
          btnType="Success"
          clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading)
    {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>
          Please fill out the contact information
        </h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ings,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
