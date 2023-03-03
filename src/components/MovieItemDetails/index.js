import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import './index.css'

class MovieItemDetails extends Component {
  state = {movieDetailsList: [], similarMoviesList: []}

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
        console.log('vikas', eachMovieItem)
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
        this.setState({
          movieDetailsList: movieDataList,
          similarMoviesList: similarMovieData,
        })
      }
    }
  }

  render() {
    const {movieDetailsList, similarMoviesList} = this.state
    const {
      adult,
      genres,
      overview,
      releaseDate,
      runtime,
      //   spokenLanguage,
      title,
      //   //   id,
      //   //   posterPath,
      //   //   backdropPath,
      //   //   budget,
      //   //   voteAverage,
      //   //   voteCount,
    } = movieDetailsList
    console.log(movieDetailsList, similarMoviesList)
    console.log(genres)
    // const GenreAudioComponent = props => {
    //   const {eachItem} = props
    //   const {id, name} = eachItem
    //   return (
    //     <div key={id} className="list-item">
    //       <p>{name}</p>
    //     </div>
    //   )
    // }

    return (
      <div className="movieItemContainer">
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
        <div className="detail-container">
          <div className="genre">
            <h1>Genres</h1>
            {/* <ul>
              {genres.map(eachGenre => (
                <GenreAudioComponent eachItem={eachGenre} />
              ))}
            </ul> */}
          </div>
          <div className="genre">
            <h1>Audio Available</h1>
            {/* <ul>
              {spokenLanguage.map(eachAudio => (
                <GenreAudioComponent eachItem={eachAudio} />
              ))}
            </ul> */}
          </div>
        </div>
        <div className="similar-container">
          <h1>More like this</h1>
          <ul>
            {similarMoviesList.map(each => (
              <MovieItem key={each.id} movieDetails={each} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}
export default MovieItemDetails
