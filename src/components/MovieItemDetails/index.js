import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import GenreAudioComponent from '../GenreAudio'
import './index.css'
// import GenreAudioComponent from '../GenreAudio'

class MovieItemDetails extends Component {
  state = {movieDetailsList: [], similarMoviesList: [], audioLanguageList: []}

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

        this.setState({
          movieDetailsList: movieDataList,
          similarMoviesList: similarMovieData,
          audioLanguageList: audioLanguage,
        })
      }
    }
  }

  render() {
    const {movieDetailsList, similarMoviesList, audioLanguageList} = this.state
    console.log(movieDetailsList)
    const {
      adult,
      genres,
      overview,
      releaseDate,
      runtime,
      title,
      //   id,
      //   posterPath,
      backdropPath,
      //   budget,
      //   voteAverage,
      //   voteCount,
    } = movieDetailsList
    console.log(genres)
    console.log(audioLanguageList)

    const movieItemTopDetails = {
      backgroundImage: `url(${backdropPath})`,
      height: '100%',
      backgroundSize: '100vw 70vh',
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
              <p>{adult}</p>
              <p>{releaseDate}</p>
            </div>
            <p>{overview}</p>
            <button type="button">Play</button>
          </div>
        </div>
        <div className="detail-container">
          <div className="genre">
            <h1>Genres</h1>
            <ul>
              {genres.map(eachGenre => (
                <GenreAudioComponent
                  key={eachGenre.id}
                  eachItem={eachGenre.name}
                />
              ))}
            </ul>
          </div>
          <div className="audio">
            <h1>Audio Available</h1>
            <ul>
              {audioLanguageList.map(eachAudio => (
                <GenreAudioComponent key={eachAudio.id} eachItem={eachAudio} />
              ))}
            </ul>
          </div>
          <div className="similar-container">
            <h1 className="more-like-heading">More like this</h1>
            <ul className="similar-movies">
              {similarMoviesList.map(each => (
                <MovieItem key={each.id} movieDetails={each} />
              ))}
            </ul>
            <h1>Rating Count</h1>
            <h1>Rating Average</h1>
            <h1>Release Date</h1>
            <h1>Budget</h1>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default MovieItemDetails
