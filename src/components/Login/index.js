import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  getUsername = event => this.setState({username: event.target.value})

  getPassword = event => this.setState({password: event.target.value})

  verifyUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      const {history} = this.props
      history.replace('/')
    } else {
      const error = data.error_msg
      document.getElementById('error-msg').textContent = error
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="desktop-container mobile-container">
        <div className="logo-container">
          <img
            className="desktop-logo"
            src="https://res.cloudinary.com/db76nylxq/image/upload/v1677486830/logo_jsnh4u.png"
            alt="login website logo"
          />
          {/* <img
            className="mobile-logo"
            src="https://res.cloudinary.com/db76nylxq/image/upload/v1677540075/Group_7399_od8hwh.png"
            alt="login website logo-f"
          /> */}
        </div>
        <div className="login-container">
          <form className="login-form" onSubmit={this.verifyUser}>
            <h1 className="login-heading">Login</h1>
            <div className="user-pass-container">
              <label htmlFor="username" className="username-label">
                USERNAME
              </label>
              <br />
              <input
                onChange={this.getUsername}
                type="text"
                placeholder="Username"
                id="username"
                className="input-element"
              />
            </div>
            <div className="user-pass-container">
              <label htmlFor="password" className="password-label">
                PASSWORD
              </label>
              <br />
              <input
                onChange={this.getPassword}
                type="password"
                placeholder="Password"
                id="password"
                className="input-element"
              />
            </div>
            <p id="error-msg" />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
