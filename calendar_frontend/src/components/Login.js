import React from 'react'
import Form from 'react-bootstrap/Form';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Authentication from '../util/Authentication';
import formatErrors from '../util/FormatErrorObject';

import '../stylesheets/SignUp.css'


class Signup extends React.Component {

    state = {
        email: '',
        password: '',
        submitted: false
    }
    componentDidMount() {
        // return history.push('/signup');
    }

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        let newAuth = new Authentication
        newAuth.login(this.state.email, this.state.password)
            .then(auth => {
                console.log(auth);
                if (auth.errors !== undefined) {
                    alert(formatErrors(auth))
                    return;
                }
                this.setState({submitted: true})
            })
      }
    render() {
        if (this.state.submitted) {
            return (<Redirect to='/'/>)
        }
        return (
            <div className = "form-container">

                <Form className = "login-form" onSubmit={this.submitHandler}>
                    <h2>Welcome, back</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" required name = "email" onChange = {this.onChangeHandler} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name = "password" required onChange = {this.onChangeHandler} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
          </div>
        );
    }
}

export default Signup;