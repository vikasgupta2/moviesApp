import {Component} from 'react'
import Cookies from 'js-cookie'
// import {HiOutlineSearch} from 'react-icons/hi'
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
    apiStatus: apiStatusConstants.dataZero,
  }

  componentDidMount() {
    this.changeSearchBar()
  }

  changeSearchBar = () => {
    document
      .getElementById('searchBar')
      .classList.remove('search-input-container1')
    document
      .getElementById('searchBar')
      .classList.add('search-input-container2')
    document
      .getElementById('searchBarButton')
      .classList.remove('search-input-container2')
    document
      .getElementById('searchBarButton')
      .classList.add('search-input-container1')
    document.getElementById('inputEle').focus()
    document
      .getElementById('searchIconBtn1')
      .setAttribute('testid', 'searchButton')
    document.getElementById('button1').removeAttribute('testid')
  }

  getInputValue1 = event => {
    this.setState({
      searchValue: event.target.value,
      apiStatus: apiStatusConstants.inProgress,
    })
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
      const options = {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        const convertedData = data.results.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }))
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
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  noDataView = () => {
    const {searchValue} = this.state
    if (searchValue.length === 0) {
      return (
        <div className="noDataView">
          <img
            src="https://res.cloudinary.com/db76nylxq/image/upload/v1678732530/Illustration_1_puqiop.png"
            alt="no movies"
            className="noData-img"
          />
          <p className="noData-para">
            Search your favourite movie in the above search box
          </p>
        </div>
      )
    }
    return (
      <div className="noDataView">
        <img
          src="https://res.cloudinary.com/db76nylxq/image/upload/v1678732530/Illustration_1_puqiop.png"
          alt="no movies"
          className="noData-img"
        />
        <p className="noData-para">
          Your search for {searchValue} did not find any matches.
        </p>
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
      <ul className="successItem">
        {searchData.map(eachItem => (
          <MovieItem key={eachItem.id} movieDetails={eachItem} />
        ))}
      </ul>
    )
  }

  failureViewSearch = () => (
    <div className="failureView">
      <img
        src="https://res.cloudinary.com/dbnwvgd9a/image/upload/v1677840687/Group_1_ne42db.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button type="button" onClick={this.getData} className="failureBtn">
        Try Again
      </button>
    </div>
  )

  renderSearchData() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureViewSearch()
      case apiStatusConstants.dataZero:
        return this.noDataView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-container">
        <Header
          searchMovie={this.getData}
          getInputValue={this.getInputValue1}
        />
        <div className="content-container">{this.renderSearchData()}</div>
      </div>
    )
  }
}

export default Search
