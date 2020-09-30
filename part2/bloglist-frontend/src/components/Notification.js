import React from 'react'

const Notification = (notificationProps) => {
    if (notificationProps.errorMessage === null) {
      return null
    }
  
    return (
      <div className={`${notificationProps.isError ? "error" : "blog"}`}>
        {notificationProps.errorMessage}
      </div>
    )
  }

  export default Notification;