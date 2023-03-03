// import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const accountProfile = () => {
    const {history} = props
    history.push('/account')
  }

  return (
    <nav className="navbar">
      <ul className="logo-menu-item">
        <li className="list-item">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/db76nylxq/image/upload/v1677486830/logo_jsnh4u.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="list-item">
          <Link to="/" className="home">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link to="/popular" className="popular">
            Popular
          </Link>
        </li>
      </ul>
      <div className="search-profile-container">
        <div className="search-input-container">
          <input type="text" placeholder="Search" />
          <HiOutlineSearch className="search-icon" />
        </div>
        <div className="profile-container">
          <img
            onClick={accountProfile}
            className="profile"
            src="https://res.cloudinary.com/db76nylxq/image/upload/v1677576755/Mask_Group_xmcqoh.png"
            alt="profile"
          />
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
