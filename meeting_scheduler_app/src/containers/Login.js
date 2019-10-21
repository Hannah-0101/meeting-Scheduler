import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import axios from 'axios';
import swal from 'sweetalert2';
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: false,
      email: "",
      password: ""
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    var that=this;
    //  this.setState({ isLoading: true });
    // swal.showLoading()
    //passing data through the urlusing php format

    const response = await axios.get(`http://localhost/newcontact/filters.php?email=${this.state.email}&password=${this.state.password}`);
    // this.props.onSubmit(response.data);
    console.log(response.data)
    // this.title = response.data.name;
    const title = response.data.title;
    const email = response.data.email;          
    const password = response.data.password;
    const first_name =response.data.first_name;
    const last_name =response.data.last_name;
    const other_name =response.data.other_name;
    const department = response.data.department;
    const rank = response.data.rank;
    // const country=response.data.country;
    const image=response.data.image_tmp;

    console.log(email)

    if(email===undefined && password===undefined){
    
      swal.fire("Oops","You have entered a wrong email or password","error")
      return
    }
    else{
      // this.setState({ isLoading: false });
      swal.fire("Good job","you have logged in sucessfully" ,"sucess")
      swal.close()

      console.log("Logged In")

      window.localStorage.setItem('image',image)
      window.localStorage.setItem('first_name',first_name)
      window.localStorage.setItem('last_name',last_name)
      window.localStorage.setItem('other_name',other_name)
      window.localStorage.setItem('email',email)
      window.localStorage.setItem('department',department)
      window.localStorage.setItem('rank',rank)
      window.localStorage.setItem('title',title)



      const path = '/meeting'
      that.props.history.push(path);

      // const path = '/dashboard'
      // that.props.history.push(path);

      // const path = '/result'
      // browserHistory.push(path)
      // const path = '/dashboard'
      // that.props.history.push(path);
     

    }
    this.setState({ password: '' , email:''});
    

  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // handleSubmit = async event => {
  //   event.preventDefault();

  //   this.setState({ isLoading: true });

  //   try {
  //     await Auth.signIn(this.state.email, this.state.password);
  //     this.props.userHasAuthenticated(true);
  //   } catch (e) {
  //     alert(e.message);
  //     this.setState({ isLoading: false });
  //   }
  // }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Link to="/login/reset">Forgot password?</Link>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
