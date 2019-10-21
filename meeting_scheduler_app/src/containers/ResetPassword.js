import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert2';
import {
  HelpBlock,
  FormGroup,
  Glyphicon,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./ResetPassword.css";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false
    };
  }

  validateCodeForm() {
    return this.state.email.length > 0;
  }

  validateResetForm() {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSendCodeClick = async event => {
    event.preventDefault();
     var that = this;
    // this.props.history.push("/login");

    this.setState({ isLoading: true });

  

    // console.log(this.state.value)
    //  return

    let formData = new FormData();
    formData.append('email', this.state.email)

    axios({
      method: 'post',
      url: 'http://localhost/newcontact/forgotpassword.php',
      data: formData,
      config: { headers: {'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json', }}
  })


    // if(email===undefined){
    
    //   swal.fire("Oops","You have entered a wrong email","error")
    //   return
    // }
    // else{
    //   // this.setState({ isLoading: false });
    //   swal.fire("Good job","A confirmation code has been sent to your mail" ,"sucess")
    // }
    
    // .then(function (response) {
    //   .then((response) => {
    //     //handle success
    //       swal.fire("Great","Successfully Signed In","success").then(result=>{
    //         if(result.value){
    //           that.props.history.push("/login");
    //         }//redirects you to the home page
    //     })
         
        
       
    //     console.log(response)

    // })
    // .catch(function (response) {
    //     //handle error
    //     console.log("hi")
    //       swal.fire("Great","Successfully Signed In","success").then(result=>{
    //         if(result.value){
    //           that.props.history.push("/login");
    //         }//redirects you to the home page
    //     })
         

    // });

    this.setState({ isLoading: false });
  }

  // handleSendCodeClick = async event => {
  //   event.preventDefault();

  //   this.setState({ isSendingCode: true });

  //   try {
  //     await Auth.forgotPassword(this.state.email);
  //     this.setState({ codeSent: true });
  //   } catch (e) {
  //     alert(e.message);
  //     this.setState({ isSendingCode: false });
  //   }
  // };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      );
      this.setState({ confirmed: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isConfirming: false });
    }
  };

  renderRequestCodeForm() {
    return (
      <form onSubmit={this.handleSendCodeClick}>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          loadingText="Sending…"
          text="Send Confirmation"
          isLoading={this.state.isSendingCode}
          disabled={!this.validateCodeForm()}
        />
      </form>
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmClick}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <HelpBlock>
            Please check your email ({this.state.email}) for the confirmation
            code.
          </HelpBlock>
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="password">
          <ControlLabel>New Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmPassword">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={this.handleChange}
            value={this.state.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          text="Confirm"
          loadingText="Confirm…"
          isLoading={this.state.isConfirming}
          disabled={!this.validateResetForm()}
        />
      </form>
    );
  }

  renderSuccessMessage() {
    return (
      <div className="success">
        <Glyphicon glyph="ok" />
        <p>Your password has been reset.</p>
        <p>
          <Link to="/login">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="ResetPassword">
        {!this.state.codeSent
          ? this.renderRequestCodeForm()
          : !this.state.confirmed
            ? this.renderConfirmationForm()
            : this.renderSuccessMessage()}
      </div>
    );
  }
}
