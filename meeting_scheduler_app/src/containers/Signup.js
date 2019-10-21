import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import axios from 'axios';
import swal from 'sweetalert2';
import "./Signup.css";
import Login from "./Login.js";

export default class Signup extends Component {
  constructor(props) {
    super(props);

  
    

    this.state = {
      isLoading: false,
      title:'',
      first_name:"",
      last_name:"",
      other_name:"",
      rank:"",
      file:null,
      department:"",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",

      newUser: null
    };
    //image code starts here
    this.onChange = this.onChange.bind(this)
  }
  onChange(e){
    this.setState({file:e.target.files[0]})
}

//image code ends here

  validateForm() {
    return (
      // this.state.title.length > 0 &&
      this.state.email.length > 0 &&
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0 &&
      this.state.other_name.length > 0 &&
      // this.state.rank.length > 0 &&
      // this.state.department.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleChangetitle = event => {
    let {tit, value} = event.target;
    this.setState({
      [tit]: value,
    });
    console.log(value)
  }
  handleChangedepartment = event => {
    let {dept, value} = event.target;
    this.setState({
      [dept]: value,
    });
    console.log(value)
  }

  handleSubmit = async event => {
    event.preventDefault();
    var that = this;
    // this.props.history.push("/login");

    this.setState({ isLoading: true });

    let file = this.state.file;

    // console.log(this.state.value)
    if(this.refs.tits){
      console.log(this.refs.tits.value)
    }

    if(this.refs.depts){
      console.log(this.refs.depts.value)
    }
    //  return
   
   

    let formData = new FormData();
    formData.append('id', this.state.id)
    formData.append('first_name', this.state.first_name)
     formData.append('last_name', this.state.last_name)
     formData.append('other_name', this.state.other_name)
    formData.append('email', this.state.email)
    formData.append('rank', this.state.rank)
    formData.append('department', this.refs.depts.value)
    formData.append('title', this.refs.tits.value)
    formData.append("avatar",file)
 
    axios({
        method: 'post',
        url: 'http://localhost/newcontact/contactssignup.php',
        data: formData,
        config: { headers: {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json', }}
    })
    // .then(function (response) {
      .then((response) => {
        //handle success
          swal.fire("Great","Successfully Signed In","success").then(result=>{
            if(result.value){
              that.props.history.push("/login");
            }//redirects you to the home page
        })
         
        
       
        console.log(response)

    })
    .catch(function (response) {
        //handle error
        console.log("hi")
          swal.fire("Oops","All fields are required","error")   

    });

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>

<FormGroup controlId="title" bsSize="large">
          <ControlLabel>Title</ControlLabel>
          <select ref="tits" onChange={this.handleChangetitle}>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
   </FormGroup>
   <FormGroup controlId="first_name" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.first_name}
            onChange={this.handleChange}
            
          />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.last_name}
            onChange={this.handleChange}
            
          />
        </FormGroup>
        <FormGroup controlId="other_name" bsSize="large">
          <ControlLabel>Other Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.other_name}
            onChange={this.handleChange}
            
          />
        </FormGroup>
    <FormGroup controlId="department" bsSize="large">
      <ControlLabel>Department</ControlLabel>
          <select ref='depts' onChange={this.handleChangedepartment} >
            <option value="Administration">Administration</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="PRO">Public Relation Officer</option>
          </select>
          
   </FormGroup>

        <FormGroup controlId="rank" bsSize="large">
          <ControlLabel>Rank</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.rank}
            onChange={this.handleChange}
            
          />
        </FormGroup>
        
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            
          />
        </FormGroup>
        {/* <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup> */}
        <FormGroup controlId="avatar" bsSize="large">
          <ControlLabel>Upload Image</ControlLabel>
          <FormControl
            value={this.state.avatar}
            onChange={this.onChange}
            type="file"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
