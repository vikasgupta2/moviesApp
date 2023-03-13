import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class MovieItem extends Component {
  render() {
    const {movieDetails} = this.props
    const {title, posterPath, id} = movieDetails
    return (
      <li className="list-movie-item">
        <Link to={`/movies/${id}`} className="movie-item">
          <img src={posterPath} alt={title} className="movie-image-item" />
        </Link>
      </li>
    )
  }
}

export default MovieItem
