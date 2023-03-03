import {FaTwitter, FaGoogle, FaYoutube, FaInstagram} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="socials">
      <FaGoogle className="social-icon" />
      <FaTwitter className="social-icon" />
      <FaInstagram className="social-icon" />
      <FaYoutube className="social-icon" />
    </div>
    <p className="footer-paragraph">Contact us</p>
  </div>
)

export default Footer
