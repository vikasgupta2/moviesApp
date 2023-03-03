import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="notfoundpage">
    <h1 className="heading">Lost Your Way ?</h1>
    <p className="paragraph">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="btnn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default PageNotFound
