import './index.css'

const TopFailureView = props => {
  const {tryAgain} = props
  const retry = () => {
    tryAgain()
  }

  return (
    <div className="failure-container-home">
      <h1>vikas</h1>
      <img
        src="https://res.cloudinary.com/dbnwvgd9a/image/upload/v1677723409/alert-triangle_pxoyql.png"
        alt="failure-img"
      />
      <p className="failure-para-home">
        Something went wrong. Please try again
      </p>
      <button className="failure-btn-home" type="button" onClick={retry}>
        Try again
      </button>
    </div>
  )
}

export default TopFailureView
