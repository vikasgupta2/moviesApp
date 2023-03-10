import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  dataZero: 'ZERO',
}

class Search extends Component {
  state = {
    searchData: [],
    searchValue: '',
    apiStatus: apiStatusConstants.inProgress,
  }

  getData = async query => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${query}`
      const options = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const convertedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      if (response.ok === true) {
        if (convertedData.length !== 0) {
          this.setState({
            searchData: convertedData,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          this.setState({
            searchData: convertedData,
            apiStatus: apiStatusConstants.dataZero,
          })
        }
      } else if (response.ok === false) {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  fetchSearchData = inputValue => {
    this.setState({searchValue: inputValue})
    this.getData(inputValue)
  }

  fetchTryAgain = () => {
    const {searchValue} = this.state
    this.getData(searchValue)
  }

  noDataView = () => {
    const {searchValue} = this.state
    return (
      <div className="content-container">
        <img
          src="https://res.cloudinary.com/dbnwvgd9a/image/upload/v1677839114/Illustration_ucpt6v.png"
          alt="no movies"
        />
        <p className>Your search for {searchValue} did not find any matches.</p>
      </div>
    )
  }

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {searchData} = this.state
    return (
      <ul>
        {searchData.map(eachItem => (
          <MovieItem key={eachItem.id} movieDetails={eachItem} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="">
      <img
        src="https://res.cloudinary.com/dbnwvgd9a/image/upload/v1677840687/Group_1_ne42db.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.fetchTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderSearchData() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.dataZero:
        return this.noDataView()
      case apiStatusConstants.failureView:
        return this.failureView()
      default:
        return this.loaderView()
    }
  }

  render() {
    return (
      <div className="search-container">
        <Header searchData={this.fetchSearchData} />
        {this.renderSearchData()}
      </div>
    )
  }
}

export default Search
