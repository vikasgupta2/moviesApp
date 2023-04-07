import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import GenreAudioComponent from '../GenreAudio'

import './index.css'

const similarMoviesConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {
    movieDetailsList: [],
    similarMoviesList: [],
    audioList: [],
    genreList: [],
    similarMoviesStatus: similarMoviesConstant.inProgress,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
      const options = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        const eachMovieItem = data.movie_details
        const movieDataList = {
          adult: eachMovieItem.adult,
          backdropPath: eachMovieItem.backdrop_path,
          budget: eachMovieItem.budget,
          genres: eachMovieItem.genres,
          id: eachMovieItem.id,
          overview: eachMovieItem.overview,
          posterPath: eachMovieItem.poster_path,
          releaseDate: eachMovieItem.release_date,
          runtime: eachMovieItem.runtime,
          similarMovie: eachMovieItem.similar_movies,
          spokenLanguage: eachMovieItem.spoken_languages,
          title: eachMovieItem.title,
          voteAverage: eachMovieItem.vote_average,
          voteCount: eachMovieItem.vote_count,
        }
        const similarMovieData = movieDataList.similarMovie.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }))

        const audioLanguage = movieDataList.spokenLanguage.map(each => ({
          id: each.id,
          name: each.english_name,
        }))

        const {genres} = movieDataList

        this.setState({
          movieDetailsList: movieDataList,
          similarMoviesList: similarMovieData,
          audioList: audioLanguage,
          genreList: genres,
          similarMoviesStatus: similarMoviesConstant.success,
        })
      } else {
        this.setState({
          similarMoviesStatus: similarMoviesConstant.failure,
        })
      }
    }
  }

  renderSuccess = () => {
    const {similarMoviesList} = this.state
    return (
      <ul className="similar-movies">
        {similarMoviesList.map(each => (
          <MovieItem key={each.id} movieDetails={each} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failureView">
      <img
        src="https://res.cloudinary.com/dbnwvgd9a/image/upload/v1677840687/Group_1_ne42db.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={this.getMovieItemDetails}
        className="failureBtn"
      >
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSimilarMovies() {
    const {similarMoviesStatus} = this.state
    switch (similarMoviesStatus) {
      case similarMoviesConstant.inProgress:
        return this.renderLoader()
      case similarMoviesConstant.success:
        return this.renderSuccess()
      default:
        return this.renderFailure()
    }
  }

  render() {
    const {movieDetailsList, audioList, genreList} = this.state
    console.log(audioList)
    console.log(genreList)
    const {
      adult,
      overview,
      releaseDate,
      runtime,
      title,
      backdropPath,
      budget,
      voteAverage,
      voteCount,
    } = movieDetailsList

    const getMonthName = monthNumber => {
      const date = new Date()
      date.setMonth(monthNumber - 1)

      // Using the browser's default locale.
      return date.toLocaleString([], {month: 'long'})
    }

    const nth = d => {
      if (d > 3 && d < 21) return 'th'
      switch (d % 10) {
        case 1:
          return 'st'
        case 2:
          return 'nd'
        case 3:
          return 'rd'
        default:
          return 'th'
      }
    }

    const mydate = new Date(releaseDate)
    // const newReleaseDate = mydate.toDateString()
    const date = mydate.getDate()
    const month = getMonthName(mydate.getMonth())
    const year = mydate.getFullYear()
    const newDate = `${date + nth(date)} ${month} ${mydate.getFullYear()}`

    const movieItemTopDetails = {
      backgroundImage: `url(${backdropPath})`,
      height: '100%',
      backgroundSize: '100vw 90vh',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#181818',
    }

    return (
      <>
        <div style={movieItemTopDetails}>
          <Header />
          <div className="movieDetails">
            <h1>{title}</h1>
            <div className="second-line">
              <p>{runtime}</p>
              <p>{adult ? 'A' : 'U/A'}</p>
              <p>{year}</p>
            </div>
            <p>{overview}</p>
            <button type="button">Play</button>
          </div>
        </div>
        <div className="bottom-container">
          <div className="detail-container">
            <div className="genre">
              <h1>Genres</h1>
              <ul>
                {genreList.map(eachGenre => (
                  <GenreAudioComponent
                    key={eachGenre.id}
                    eachItem={eachGenre}
                  />
                ))}
              </ul>
            </div>
            <div className="audio">
              <h1>Audio Available</h1>
              <ul>
                {audioList.map(eachAudio => (
                  <GenreAudioComponent
                    key={eachAudio.id}
                    eachItem={eachAudio}
                  />
                ))}
              </ul>
            </div>
            <div>
              <div>
                <h1>Rating Count</h1>
                <p>{voteCount}</p>
              </div>
              <div>
                <h1>Rating Average</h1>
                <p>{voteAverage}</p>
              </div>
            </div>
            <div>
              <div>
                <h1>Budget</h1>
                <p>{budget}</p>
              </div>
              <div>
                <h1>Release Date</h1>
                <p>{newDate}</p>
              </div>
            </div>
          </div>

          <div className="similar-container">
            <h1 className="more-like-heading">More like this</h1>
            {this.renderSimilarMovies()}
          </div>
        </div>

        <Footer />
      </>
    )
  }
}
export default MovieItemDetails
