import { PropTypes } from "prop-types"

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { message, status } = notification

  return (
    <div className={`notification ${status}`}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.string,
  }),
}

export default Notification
