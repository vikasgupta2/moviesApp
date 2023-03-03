import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import FailureView from '../FailureView'
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
      } else if (response.ok !== false) {
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
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  tryAgain = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => <FailureView tryAgain={this.tryAgain} />

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
