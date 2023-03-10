import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-container">
    <h1 className="heading">Lost Your Way ?</h1>
    <p className="paragraph">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default PageNotFound
