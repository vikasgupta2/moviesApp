import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import TopFailureView from '../HomeTopFailure'

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

const apiStatusTrendingConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiStatusOriginalsConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const apiStatusTopContainerConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    trendingVideos: [],
    originalVideos: [],
    randomOriginalMovie: {},
    apiStatusTrendingVideos: apiStatusTrendingConstant.inProgress,
    apiStatusOriginalVideos: apiStatusOriginalsConstant.inProgress,
    apiStatusTopContainer: apiStatusTopContainerConstant.inProgress,
  }

  componentDidMount() {
    this.getTrendingData()
    this.getOriginalData()
  }

  getTrendingData = async () => {
    this.setState({
      apiStatusTrendingVideos: apiStatusTrendingConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const trendingArray = data.results
      const convertedTrending = trendingArray.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        trendingVideos: convertedTrending,
        apiStatusTrendingVideos: apiStatusTrendingConstant.success,
      })
    } else {
      this.setState({
        apiStatusTrendingVideos: apiStatusTrendingConstant.failure,
      })
    }
  }

  getOriginalData = async () => {
    this.setState({
      apiStatusOriginalVideos: apiStatusOriginalsConstant.inProgress,
      apiStatusTopContainer: apiStatusTopContainerConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const original = await response.json()
      const originalArray = original.results
      const convertedOriginal = originalArray.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      const randomOriginal =
        convertedOriginal[Math.floor(Math.random() * convertedOriginal.length)]
      this.setState({
        originalVideos: convertedOriginal,
        randomOriginalMovie: randomOriginal,
        apiStatusOriginalVideos: apiStatusOriginalsConstant.success,
        apiStatusTopContainer: apiStatusTopContainerConstant.success,
      })
    } else {
      this.setState({
        apiStatusOriginalVideos: apiStatusOriginalsConstant.failure,
        apiStatusTopContainer: apiStatusTopContainerConstant.failure,
      })
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

  TrendingSuccessView = () => (
    <div className="trending-container">
      <div className="slick-container">{this.renderTrendingSlider()}</div>
    </div>
  )

  OriginalSuccessView = () => (
    <div className="original-container">
      <div className="slick-container">{this.renderOriginalSlider()}</div>
    </div>
  )

  topContainerSuccessView = () => {
    const {randomOriginalMovie} = this.state
    return (
      <div className="top-container">
        <h1 className="heading-home">{randomOriginalMovie.name}</h1>
        <p className="paragraph-home">{randomOriginalMovie.overview}</p>
        <button className="btn-home" type="button">
          Play
        </button>
      </div>
    )
  }

  topContainerFailureView = () => (
    <TopFailureView tryAgain={this.getOriginalData} />
  )

  TrendingFailureView = () => <FailureView tryAgain={this.getTrendingData} />

  OriginalFailureView = () => <FailureView tryAgain={this.getOriginalData} />

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingContainer() {
    const {apiStatusTrendingVideos} = this.state
    switch (apiStatusTrendingVideos) {
      case apiStatusTrendingConstant.success:
        return this.TrendingSuccessView()
      case apiStatusTrendingConstant.failure:
        return this.TrendingFailureView()
      case apiStatusTrendingConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderOriginalContainer() {
    const {apiStatusOriginalVideos} = this.state
    switch (apiStatusOriginalVideos) {
      case apiStatusOriginalsConstant.success:
        return this.OriginalSuccessView()
      case apiStatusOriginalsConstant.failure:
        return this.OriginalFailureView()
      case apiStatusOriginalsConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderTopContainer() {
    const {apiStatusTopContainer} = this.state
    switch (apiStatusTopContainer) {
      case apiStatusTopContainerConstant.success:
        return this.topContainerSuccessView()
      case apiStatusTopContainerConstant.failure:
        return this.topContainerFailureView()
      case apiStatusTopContainerConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {randomOriginalMovie} = this.state
    let randomMovieBackground = {
      backgroundImage: `url(${randomOriginalMovie.backdropPath})`,
      height: '100vh',
      backgroundSize: '100vw 80vh',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#181818',
    }

    if (randomOriginalMovie.name === undefined) {
      randomMovieBackground = {
        height: '100vh',
        backgroundColor: '#181818',
      }
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div style={randomMovieBackground}>
        <Header />
        <div className="main-top-container">{this.renderTopContainer()}</div>
        <div className="bottom-container">
          <h1 className="video-heading">Trending Now</h1>
          {this.renderTrendingContainer()}
          <h1 className="video-heading">Originals</h1>
          {this.renderOriginalContainer()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
