import './index.css'

const FailureView = props => {
  const {tryAgain} = props
  const retry = () => {
    tryAgain()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dbnwvgd9a/image/upload/v1677723409/alert-triangle_pxoyql.png"
        alt="failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again </p>
      <button className="failure-btn" type="button" onClick={retry}>
        Try again
      </button>
    </div>
  )
}

export default FailureView
