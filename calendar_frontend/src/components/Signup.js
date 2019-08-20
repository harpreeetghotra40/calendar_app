import React from 'react'
import Form from 'react-bootstrap/Form';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Authentication from '../util/Authentication';
import formatErrors from '../util/FormatErrorObject'
import '../stylesheets/SignUp.css'


class Signup extends React.Component {

    state = {
        name:'',
        email: '',
        password: ''
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
        const authPromise = newAuth.signup(this.state.name, this.state.email, this.state.password);
        authPromise.then(auth => {
            console.log(auth);
            if (auth.errors !== undefined) {
                alert(formatErrors(auth));
                return;
            }
            // <Redirect to='/'/>
        })
      }

    render() {
        return (
            <div className = "form-container">
                <Form className = "signup-form" onSubmit={this.submitHandler}>
                <h2>Create Account</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name = "name" onChange = {this.onChangeHandler} placeholder="Enter name" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name = "email" onChange = {this.onChangeHandler} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name = "password" onChange = {this.onChangeHandler}placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Account
                </Button>

                <Link to='/login'>Login instead...</Link>
                </Form>
          </div>
        );
    }
}

export default Signup;