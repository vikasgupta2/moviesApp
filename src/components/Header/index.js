import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  accountProfile = () => {
    const {history} = this.props
    history.push('/account')
  }

  redirectToSearchRoute = () => {
    const {history} = this.props
    history.replace('/search')
  }

  render() {
    const {searchMovie, getInputValue} = this.props
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
          <div className="search-input-container1" id="searchBar">
            <button
              type="button"
              testid="searchButton"
              id="button1"
              className="searchButton"
              onClick={this.redirectToSearchRoute}
            >
              <HiOutlineSearch className="search-icon" />
            </button>
          </div>
          <div className="search-input-container2" id="searchBarButton">
            <input
              type="search"
              placeholder="Search"
              id="inputEle"
              className="inputClass"
              onChange={getInputValue}
            />
            <button
              type="button"
              id="searchIconBtn1"
              className="search-btn1"
              onClick={searchMovie}
            >
              <HiOutlineSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-container">
            <img
              onClick={this.accountProfile}
              className="profile"
              src="https://res.cloudinary.com/db76nylxq/image/upload/v1677576755/Mask_Group_xmcqoh.png"
              alt="profile"
            />
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
