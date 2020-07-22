import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Auth.css';
import { checkValidity } from '../../share/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
    },
    isSignup: true
  }
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/')
    {
      this.props.onSetAuthRedirectPath();
    }
  }
  inputChangeHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    this.setState({
      controls: updatedControls
    });
  }
  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls)
    {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formEl => (
      <Input
        key={formEl.id}
        elementConfig={formEl.config.elementConfig}
        elementType={formEl.elementType}
        value={formEl.config.value}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
        changed={(e) => this.inputChangeHandler(e, formEl.id)}
      />
    ));
    if (this.props.loading === true)
    {
      form = <Spinner />
    }
    let errorMessage = null;
    if (this.props.error)
    {
      errorMessage = (
        <p style={{ color: 'red' }} > {this.props.error.message} </p>
      );
    }
    let authRedirect = null;
    if (this.props.isAuthenticated)
    {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" >
            Submit
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger" >
          Swicth To {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);