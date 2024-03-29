import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
// import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {popularMovies: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
      const options = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        const popularMovie = data.results
        const popularMovieList = popularMovie.map(each => ({
          id: each.id,
          backdropPath: each.backdrop_path,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }))
        this.setState({
          popularMovies: popularMovieList,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  renderSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <ul className="popular-movies">
        {popularMovies.map(eachMovie => (
          <MovieItem key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="popular-loading" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="popular-failure">
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dbnwvgd9a/image/upload/v1677723409/alert-triangle_pxoyql.png"
          alt="failure view"
        />
        <p className="failure-para">Something went wrong. Please try again </p>
        <button
          className="failure-btn"
          type="button"
          onClick={this.getPopularMovies}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderPopularMovies() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-main-container">
        <Header />
        {this.renderPopularMovies()}
        <Footer />
      </div>
    )
  }
}
export default Popular
