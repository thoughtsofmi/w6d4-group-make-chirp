import React from 'react'
import ReactDOM from 'react-dom'

class Signup extends React.Component {
  constructor(props){
    super(props)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.uploadedHandler = this.uploadedHandler.bind(this)
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
    //Create 2 - Create function to handle Upload event
    uploadHandler(){
      var formData = new FormData()
      formData.append('username', this.state.username)
      formData.append('email', this.state.email)
      formData.append('password', this.state.password)
      // formData.append('file', this.state.file) --> Add later
      console.log(formData)

      fetch('https://polar-sea-81260.herokuapp.com/signup', {
        body: formData,
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      })
      .then(response => response.json())
      .then(this.uploadedHandler)
    }

    uploadedHandler(response) {
      console.log(response)
      if (typeof response.username != 'undefined') {
        sessionStorage.setItem('sessionToken', response.api_token);
        // TODO: Needs to direct to the chirps view page...
        window.location.href = 'index.html';
      }
    }

  render(){
    return <div className="container">
    <div className="row">
    <div className="col-sm-6 col-sm-offset-3">
    <img src="./img/chirp-logo.png" alt="image of the chirp logo" />
    <h1>Sign-Up</h1>
    <hr />
    <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" value={this.state.username} id="nameSignup" name="name" placeholder="Johnny" className="form-control" onChange={(e)=> this.setState({username:e.target.value})} required />
    </div>
    <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" placeholder="sample@gmail.com" value={this.state.email} id="emailSignup" name="email" className="form-control" onChange={(e)=> this.setState({email:e.target.value})} required />
    </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" id="passwordSignup" name="password" className="form-control" value={this.state.password} onChange={(e)=> this.setState({password:e.target.value})} required />
    </div>
    <div className="form-group">
    <label htmlFor="photo">Photo</label>
    <input type="file" id="photoSignup" name="photo" className="form-control" required /*onChange={(e)=> this.setState({name:e.target.file[0]})}*/ />
    </div>
    <div id="errors"></div>
    <div className="form-group">
    <button type="button" id="uploadSignup" className="btn btn-bg btn-block" onClick={this.uploadHandler}>Upload!</button>
    </div>
    </div>
    </div>
    </div>
  }
}
export default Signup
