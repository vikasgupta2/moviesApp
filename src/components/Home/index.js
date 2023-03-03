import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    trendingVideos: [],
    originalVideos: [],
    randomOriginalMovie: {},
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getTrendingVideos()
    this.getOriginalVideos()
  }

  getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const data = await fetch(apiUrl, options)
    if (data.ok === true) {
      const trending = await data.json()
      const trendingArray = trending.results
      const convertedTrending = trendingArray.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trendingVideos: convertedTrending,
        apiStatus: apiStatusConstants.success,
      })
    } else if (data.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getOriginalVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const data = await fetch(apiUrl, options)
    if (data.ok === true) {
      const original = await data.json()
      const originalArray = original.results
      const convertedOriginal = originalArray.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      const randomOriginal =
        convertedOriginal[Math.floor(Math.random() * convertedOriginal.length)]
      this.setState({
        originalVideos: convertedOriginal,
        randomOriginalMovie: randomOriginal,
        apiStatus: apiStatusConstants.success,
      })
    } else if (data.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTrendingSlider = () => {
    const {trendingVideos} = this.state
    return (
      <Slider {...settings}>
        {trendingVideos.map(eachVideo => {
          const {id, posterPath, name} = eachVideo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="movie-image" src={posterPath} alt={name} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderOriginalSlider = () => {
    const {originalVideos} = this.state
    return (
      <Slider {...settings}>
        {originalVideos.map(eachVideo => {
          const {id, posterPath, name} = eachVideo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="movie-image" src={posterPath} alt={name} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderSuccessView = () => (
    <div className="trending-container">
      <p className="slick-paragraph">Trending Now</p>
      <div className="slick-container">{this.renderTrendingSlider()}</div>
    </div>
  )

  renderOriginalSuccessView = () => (
    <div className="original-container">
      <p className="slick-paragraph">Originals</p>
      <div className="slick-container">{this.renderOriginalSlider()}</div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  tryAgain = () => {
    this.getOriginalVideos()
    this.getTrendingVideos()
  }

  renderFailureView = () => <FailureView tryAgain={this.tryAgain} />

  renderTrendingContainer() {
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

  renderOriginalContainer() {
    const {apiStatus} = this.state
    // console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {randomOriginalMovie} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="main-home-container" testid="home">
        <Header />
        <div className="top-container">
          <h1 className="heading-home">{randomOriginalMovie.title}</h1>
          <p className="paragraph-home">{randomOriginalMovie.overview}</p>
          <button className="btn-home" type="button">
            Play
          </button>
        </div>
        <div className="bottom-container">
          {this.renderTrendingContainer()}
          {this.renderOriginalContainer()}
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
