import React from "react";
import axios from 'axios';
import swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';

import "./NewMeeting.css";


class  NewMeeting extends React.Component {
    constructor(props){
        super(props);
       
    this.state = {
        meeting_name:'',
        scheduler: '',
        chairman: '',
        date: '',
        time: '',
        room: '',
        location:'',
        agenda:'',
        items: [],
    value: "",
    error: null,
        file: null    
        
    }
    //image code starts here
    this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        this.setState({file:e.target.files[0]})
    }
    
    //image code ends here
    
//   validateForm() {
//     return (
//       this.state.meeting_name.length > 0 &&
//       this.state.scheduler.length > 0 &&
//       this.state.chairman.length > 0 &&
//       this.state.agenda.length > 0 &&
//       this.state.location.length > 0 &&
//       this.state.room.length > 0 &&
//       this.state.password.length > 0 &&
//        this.state.password === this.state.confirmPassword
//       );
//     }
      // this.state.rank.length > 0 &&
      // this.state.department.length > 0 &&
    //   this.state.password.length > 0 &&
    //   this.state.password === this.state.confirmPassword
   

//   validateConfirmationForm() {
//     return this.state.confirmationCode.length > 0;
//   }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();
    var that = this;
    this.setState({ isLoading: true });
    let file = this.state.file;
    let formData = new FormData();
    formData.append('meeting_name', this.state.meeting_name)
    formData.append('scheduler', this.state.scheduler)
     formData.append('chairman', this.state.chairman)
     formData.append('agenda', this.state.agenda)
    formData.append('items', this.state.items)
    formData.append('location', this.state.location)
    formData.append('date', this.state.date)
    formData.append('room', this.state.value)
    // formData.append('room', this.refs.room.value)
    formData.append("file",file)
 
    axios.post('http://localhost/newcontact/sample.php', formData)
    // axios({
    //     method:'post',
    //     url: 'http://localhost/newcontact/meetingscheduler.php',
    //     data: formData,
    //     config: { headers: {'Access-Control-Allow-Origin':'*',
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json', }}

    // })
    
      .then((response) => {
        //handle success
          swal.fire("Great","Form Submitted Successfully","success").then(result=>{
            if(result.value){
              that.props.history.push("/");
            }//redirects you to the home page
        })  
        console.log(response)

    })
    .catch(function (response) {
        //handle error
        console.log("hi")
        //   swal.fire("Oops","All fields are required","error")   
          console.log(response);

         

    });

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    
  }

  
  
  handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        });
      }
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded]
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  
  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit}>
        <input
           name="meeting_name"
          className="input "
          value={this.state.meeting_name}
          placeholder="Name of meeting..."
          onChange={e => this.setState({ meeting_name: e.target.value })}
        /> 
        <input
            name="chairman"
          className="input "
          value={this.state.chairman}
          placeholder="Chaired By"
          onChange={e => this.setState({ chairman: e.target.value })}
        /> 
        <input
          name="scheduler"
          className="input "
          value={this.state.scheduler}
          placeholder="Scheduled by..."
          onChange={e => this.setState({ scheduler: e.target.value })}
        /> 
        <input
          name="date"
          className="input "
          type="date"
          value={this.state.date}
          placeholder="When..."
          onChange={e => this.setState({ date: e.target.value })}
        /> 
        <input
          name="location"
          className="input "
          type="text"
          value={this.state.location}
          placeholder="Location"
          onChange={e => this.setState({ location: e.target.value })}
        /> 
        <input
        name="room"
          className="input "
          type="text"
          value={this.state.room}
          placeholder="Room Details"
          onChange={e => this.setState({ room: e.target.value })}
        /> 
        <div>
        
        <textarea
          name="agenda"
          className="input form-control  "
          rows="5"
          value={this.state.agenda}
          placeholder="Agenda"
          onChange={e => this.setState({ agenda: e.target.value })}
          />
          </div>
          <input
          name="file"
          className="input "
          type="file"
          value={this.state.file}
          placeholder="Upload"
          onChange={e => this.setState({ file: e.target.value })}
        /> 
          <input
          name="attendees"
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Type or paste email addresses and press `Enter`..."
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste={this.handlePaste}
        /> 
          {this.state.items.map(item => (
          <div className="tag-item" key={item}>
            {item}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}
        {this.state.error && <p className="error">{this.state.error}</p>}
          
          <input
          className="input "
          type="submit"
          value="Send Meeting Details"
        //   onChange={e => this.setState({ room: e.target.value })}
        />
          
        
       
          </form> 
      </>
    );
  }
}


export default NewMeeting