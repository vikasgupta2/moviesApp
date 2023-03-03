import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Account extends Component {
  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="main-account-container">
        <Header />
        <div className="account-details-container">
          <div classNames="account-container">
            <h1 className="account-heading">Account</h1>
            <hr className="line" />
            <div className="membership">
              <p className="member-paragraph">Member ship</p>
              <div>
                <p className="email">rahul@gmail.com</p>
                <p className="password">Password : ***********</p>
              </div>
            </div>
            <hr className="line" />
            <div className="plan">
              <p className="plan-paragraph"> Plan details</p>
              <p className="premium">Premium </p>
              <p className="ultra">Ultra HD</p>
            </div>
            <hr className="line" />
          </div>
          <button type="button" className="logout-btn" onClick={this.logout}>
            Logout
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Account
