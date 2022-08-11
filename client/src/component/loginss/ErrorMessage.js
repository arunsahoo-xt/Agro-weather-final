import React from 'react'
import {Alert} from 'react-bootstrap';
import { Notification, toaster } from 'rsuite';
const ErrorMessage = ({variant="info",children}) => {
  const message=(
    <Notification closable type={variant} header='Error'>
      <h5>{children}</h5>
    </Notification>);
   
    toaster.push(message,{placement: 'topEnd'});
  return (
    <></>
    // <div>
    //     <Alert variant={variant} style={{fontSize:20}}>
    //         <strong>{children}</strong>
    //     </Alert>
    // </div>
  //   <div className="notification-container">
  //   <Notification closable type='error' placement='topCenter'>
  //     <h3>{children}</h3>
  //   </Notification>
  //   {/* <Notification closable type="info" header="Informational">
  //     <Paragraph width={320} rows={3} />
  //   </Notification> */}
  // </div>
  )
}

export default ErrorMessage